import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { Button, message, Steps, DatePicker, Input, Select } from "antd";
import { getAllServices } from "../../services/serviceService";
import { getAllStaffByServiceId } from "../../services/userService";
import {
  fetchDistrictsByProvince,
  fetchWardsByDistrict,
} from "../../services/addressService";
import { createBooking } from "../../services/bookingService";
import dayjs from "dayjs";
import { useLocation, useNavigate } from "react-router-dom";
import { formatCurrency } from "../../utils/formatCurrency";

const { Step } = Steps;

const App = () => {
  const location = useLocation();
  const serviceId = location.state?.serviceId;
  const [current, setCurrent] = useState(0);
  const [services, setServices] = useState([]);
  const [selectedService, setSelectedService] = useState(serviceId);
  const [staffList, setStaffList] = useState([]);
  const [selectedStaff, setSelectedStaff] = useState(null);
  const [districts, setDistricts] = useState([]);
  const [wards, setWards] = useState([]);
  const [selectedCity, setSelectedCity] = useState(null);
  const [selectedCityName, setSelectedCityName] = useState("");
  const [selectedDistrict, setSelectedDistrict] = useState(null);
  const [selectedDistrictName, setSelectedDistrictName] = useState("");
  const [selectedWard, setSelectedWard] = useState(null);
  const [selectedWardName, setSelectedWardName] = useState("");
  const [street, setStreet] = useState("");
  const [selectedDateTime, setSelectedDateTime] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const user = useSelector((state) => state.user.userInfo);
  const navigate = useNavigate();

  const cities = [
    { value: "01", label: "Hà Nội" },
    { value: "48", label: "Đà Nẵng" },
    { value: "79", label: "Thành phố Hồ Chí Minh" },
  ];

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const data = await getAllServices(1, 100);
        setServices(data.services || []);
      } catch (error) {
        console.error("Lỗi khi lấy dịch vụ:", error);
        message.error("Không thể tải danh sách dịch vụ.");
      }
    };
    fetchServices();
  }, [serviceId]);

  const handleServiceChange = (serviceId) => {
    setSelectedService(serviceId);
    setSelectedStaff(null);
  };

  const handleFetchStaff = async () => {
    try {
      if (!selectedDateTime) {
        message.warning("Vui lòng chọn thời gian trước khi tiếp tục.");
        return;
      }
      console.log(selectedCityName);
      const bookingTime = selectedDateTime.toISOString();

      if (!user?._id) {
        message.warning("Không tìm thấy thông tin người dùng.");
        return;
      }

      const data = await getAllStaffByServiceId(
        selectedService,
        bookingTime,
        user._id,
        selectedCityName
      );
      setStaffList(data || []);
      setCurrent(current + 1);
    } catch (error) {
      console.error("Lỗi khi lấy danh sách nhân viên:", error);
      message.error("Không thể tải danh sách nhân viên.");
    }
  };

  const handleCityChange = async (cityCode) => {
    setSelectedCity(cityCode);
    const city = cities.find((c) => c.value === cityCode);
    setSelectedCityName(city?.label || "");
    try {
      const districtsData = await fetchDistrictsByProvince(cityCode);
      setDistricts(districtsData);
      setSelectedDistrict(null);
      setSelectedDistrictName("");
      setSelectedWard(null);
      setSelectedWardName("");
      setWards([]);
    } catch (error) {
      console.error("Lỗi khi lấy quận/huyện:", error);
      message.error("Không thể tải danh sách quận/huyện.");
    }
  };

  const handleDistrictChange = async (districtCode) => {
    setSelectedDistrict(districtCode);
    const district = districts.find((d) => d.code === districtCode);
    setSelectedDistrictName(district?.name || "");
    try {
      const wardsData = await fetchWardsByDistrict(districtCode);
      setWards(wardsData);
      setSelectedWard(null);
      setSelectedWardName("");
    } catch (error) {
      console.error("Lỗi khi lấy phường/xã:", error);
      message.error("Không thể tải danh sách phường/xã.");
    }
  };

  const handleWardChange = (wardCode) => {
    setSelectedWard(wardCode);
    const ward = wards.find((w) => w.code === wardCode);
    setSelectedWardName(ward?.name || "");
  };

  const handleBookingSubmit = async () => {
    if (!selectedService || !selectedStaff || !selectedDateTime) {
      message.warning("Vui lòng điền đầy đủ thông tin booking.");
      return;
    }

    setIsLoading(true);
    const selectedStaffData = staffList.find(
      (staff) => staff._id === selectedStaff
    );
    const staffDiscount = selectedStaffData?.discountPercentage || 0;
    const bookingData = {
      customerId: user._id,
      serviceId: selectedService,
      preferredStaffId: selectedStaff,
      status: "pending",
      bookingTime: selectedDateTime.toISOString(),
      totalCost:
        services.find((service) => service._id === selectedService)
          ?.basePrice || 0,
      customerAddress: `${street}, ${selectedWardName}, ${selectedDistrictName}, ${selectedCityName}`,
      staffDiscount,
    };

    try {
      const response = await createBooking(bookingData);
      const bookingId = response.payload.bookingId;
      navigate(`/booking-success/${bookingId}`, { state: bookingData });
      message.success("Đặt lịch thành công");
    } catch (error) {
      message.error(
        error?.response?.data?.message ||
          "Tạo booking thất bại, vui lòng thử lại sau."
      );
      console.error("Tạo booking thất bại:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const next = () => {
    if (current === 0 && !selectedService) {
      message.warning("Vui lòng chọn dịch vụ trước khi tiếp tục.");
      return;
    }
    if (
      current === 1 &&
      (!selectedCity ||
        !selectedDistrict ||
        !selectedWard ||
        !street ||
        !selectedDateTime)
    ) {
      message.warning("Vui lòng điền đầy đủ thông tin thời gian và địa điểm.");
      return;
    }
    if (current === 1) {
      handleFetchStaff();
      return;
    }
    setCurrent(current + 1);
  };

  const prev = () => {
    setCurrent(current - 1);
  };

  const disabledDate = (currentDate) => {
    const today = dayjs().startOf("day");
    const maxDate = dayjs().add(10, "day").endOf("day");
    return currentDate && (currentDate < today || currentDate > maxDate);
  };

  const disabledTime = (date) => {
    const hours = Array.from(Array(24).keys());
    return {
      disabledHours: () => hours.filter((hour) => hour < 8 || hour >= 20),
    };
  };

  const steps = [
    {
      title: "Dịch vụ",
      content: (
        <div style={{ padding: "20px", textAlign: "center" }}>
          <h3 style={{ color: "#FF6F3C", fontSize: "24px" }}>
            Tất cả các dịch vụ tiện ích của We Shine
          </h3>
          <Select
            showSearch
            placeholder="Chọn dịch vụ"
            optionFilterProp="children"
            style={{
              width: "100%",
              maxWidth: "500px",
              margin: "20px auto",
              display: "block",
              borderRadius: "5px",
              height: "80px",
              border: "1px solid #FF6F3C",
              fontSize: "16px",
            }}
            onChange={handleServiceChange}
            value={selectedService || undefined}
            options={services.map((service) => ({
              value: service._id,
              label: (
                <div style={{ display: "flex", alignItems: "center" }}>
                  <img
                    src={service.images[0] || "/default-service.png"}
                    alt={service.serviceName}
                    style={{
                      width: "50px",
                      height: "50px",
                      objectFit: "cover",
                      marginRight: "10px",
                      borderRadius: "4px",
                    }}
                  />
                  <div>
                    <div style={{ fontWeight: "bold" }}>
                      {service.serviceName}
                    </div>
                    <div style={{ fontSize: "12px", color: "#888" }}>
                      {`Chi phí dự tính: ${formatCurrency(service.basePrice)}`}
                    </div>
                  </div>
                </div>
              ),
            }))}
            filterOption={(input, option) =>
              option.label.props.children[1].props.children[0]
                .toLowerCase()
                .includes(input.toLowerCase())
            }
          />
        </div>
      ),
    },
    {
      title: "Thời gian và địa điểm",
      content: (
        <div style={{ padding: "20px", textAlign: "center" }}>
          <h3
            style={{ color: "#FF6F3C", fontSize: "24px", fontWeight: "bold" }}
          >
            Chọn thời gian và địa điểm
          </h3>
          <div
            style={{
              display: "flex",
              gap: "10px",
              marginBottom: "20px",
              justifyContent: "center",
              flexWrap: "wrap",
            }}
          >
            <Select
              showSearch
              placeholder="Chọn Tỉnh/Thành phố"
              optionFilterProp="children"
              style={{
                flex: 1,
                maxWidth: "250px",
                height: "40px",
                borderRadius: "5px",
                border: "1px solid #FF6F3C",
                fontSize: "16px",
              }}
              onChange={handleCityChange}
              value={selectedCity || undefined}
              options={cities}
            />
            <Select
              showSearch
              placeholder="Chọn Quận/Huyện"
              optionFilterProp="children"
              style={{
                flex: 1,
                maxWidth: "250px",
                height: "40px",
                borderRadius: "5px",
                border: "1px solid #FF6F3C",
                fontSize: "16px",
              }}
              onChange={handleDistrictChange}
              value={selectedDistrict || undefined}
              options={districts.map((district) => ({
                value: district.code,
                label: district.name,
              }))}
              disabled={!selectedCity}
            />
            <Select
              showSearch
              placeholder="Chọn Phường/Xã"
              optionFilterProp="children"
              style={{
                flex: 1,
                maxWidth: "250px",
                height: "40px",
                borderRadius: "5px",
                border: "1px solid #FF6F3C",
                fontSize: "16px",
              }}
              onChange={handleWardChange}
              value={selectedWard || undefined}
              options={wards.map((ward) => ({
                value: ward.code,
                label: ward.name,
              }))}
              disabled={!selectedDistrict}
            />
            <Input
              placeholder="Nhập tên đường"
              style={{
                flex: 2,
                maxWidth: "200px",
                height: "40px",
                borderRadius: "5px",
                border: "1px solid #FF6F3C",
                fontSize: "16px",
              }}
              onChange={(e) => setStreet(e.target.value)}
              value={street}
            />
          </div>
          <DatePicker
            showTime
            onChange={(dateTime) => setSelectedDateTime(dateTime)}
            style={{
              borderRadius: "5px",
              border: "1px solid #FF6F3C",
              height: "40px",
              fontSize: "16px",
              width: "100%",
              maxWidth: "500px",
            }}
            format="YYYY-MM-DD HH:mm"
            placeholder="Chọn ngày và giờ"
            disabledDate={disabledDate}
            disabledTime={disabledTime}
          />
        </div>
      ),
    },
    {
      title: "Chọn nhân viên theo yêu cầu",
      content: (
        <div style={{ padding: "20px", textAlign: "center" }}>
          <h3 style={{ color: "#FF6F3C", fontSize: "24px" }}>
            Chọn nhân viên yêu thích của bạn:
          </h3>
          <Select
            showSearch
            placeholder="Chọn nhân viên"
            optionFilterProp="children"
            style={{
              width: "100%",
              maxWidth: "500px",
              margin: "20px auto",
              display: "block",
              borderRadius: "5px",
              height: "80px",
              border: "1px solid #FF6F3C",
              fontSize: "16px",
            }}
            onChange={(value) => setSelectedStaff(value)}
            value={selectedStaff || undefined}
            options={staffList.map((staff) => ({
              value: staff._id,
              label: (
                <div style={{ display: "flex", alignItems: "center" }}>
                  <img
                    src={
                      staff.avatar ||
                      "https://i.pinimg.com/originals/94/e4/cb/94e4cb5ae194975f6dc84d1495c3abcd.gif"
                    }
                    alt={staff.name}
                    style={{
                      width: "50px",
                      height: "50px",
                      objectFit: "cover",
                      marginRight: "10px",
                      borderRadius: "50%",
                    }}
                  />
                  <div>
                    <div style={{ display: "flex", alignItems: "center" }}>
                      <div style={{ fontWeight: "bold" }}>{staff.name}</div>
                      {staff.isFavorite && (
                        <span
                          style={{
                            color: "#FFD700",
                            fontSize: "18px",
                            marginLeft: "5px",
                          }}
                        >
                          ★
                        </span>
                      )}
                    </div>
                    <div style={{ fontSize: "12px", color: "#888" }}>
                      {staff.address}
                    </div>
                  </div>
                </div>
              ),
            }))}
            filterOption={(input, option) =>
              option.label.props.children[1].props.children[0]
                .toLowerCase()
                .includes(input.toLowerCase())
            }
          />
        </div>
      ),
    },
  ];

  const items = steps.map((item) => ({ key: item.title, title: item.title }));

  return (
    <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "20px" }}>
      <Steps current={current} items={items} />
      <div
        style={{
          padding: "20px",
          backgroundColor: "#f9f9f9",
          marginTop: "16px",
          borderRadius: "8px",
        }}
      >
        {steps[current].content}
      </div>
      <div style={{ marginTop: 24, textAlign: "center" }}>
        {current < steps.length - 1 && (
          <Button
            type="primary"
            onClick={next}
            style={{
              backgroundColor: "#FF6F3C",
              borderRadius: "5px",
              fontSize: "16px",
              padding: "10px 20px",
            }}
          >
            Tiếp tục
          </Button>
        )}
        {current === steps.length - 1 && (
          <Button
            type="primary"
            onClick={handleBookingSubmit}
            style={{
              backgroundColor: "#FF6F3C",
              borderRadius: "5px",
              fontSize: "16px",
              padding: "10px 20px",
            }}
            loading={isLoading}
          >
            Hoàn tất
          </Button>
        )}
        {current > 0 && (
          <Button
            onClick={prev}
            style={{
              margin: "0 8px",
              borderRadius: "5px",
              fontSize: "16px",
              padding: "10px 20px",
            }}
          >
            Quay lại
          </Button>
        )}
      </div>
    </div>
  );
};

export default App;
