import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import {
  getFavoriteStaffByCustomer,
  removeFavoriteStaff,
} from "../../services/favoriteStaffService"; // API functions
import { Card, Button, Typography, message, Spin, Pagination } from "antd";
import {
  EnvironmentOutlined,
  HeartFilled,
  PhoneOutlined,
} from "@ant-design/icons";

const { Title, Text } = Typography;

const formatPhoneNumber = (phone) => {
  return `${phone.slice(0, 3)}*****${phone.slice(-2)}`;
};

const FavoriteStaff = () => {
  const [favoriteStaff, setFavoriteStaff] = useState([]);
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const limit = 10;

  const customerId = useSelector((state) => state.user.userInfo?._id);

  useEffect(() => {
    if (customerId) {
      fetchFavoriteStaff();
    }
  }, [customerId, currentPage]);

  const fetchFavoriteStaff = async () => {
    setLoading(true);
    try {
      const data = await getFavoriteStaffByCustomer(
        customerId,
        currentPage,
        limit
      );
      setFavoriteStaff(data.favoriteStaffList);
      setTotalPages(data.totalPages);
    } catch (error) {
      message.error("Lỗi khi lấy danh sách nhân viên yêu thích.");
    } finally {
      setLoading(false);
    }
  };

  const handleRemoveFavorite = async (staffId) => {
    try {
      await removeFavoriteStaff(customerId, staffId);
      message.success("Đã xóa nhân viên khỏi danh sách yêu thích.");
      fetchFavoriteStaff();
    } catch (error) {
      message.error("Lỗi khi xóa nhân viên khỏi danh sách yêu thích.");
    }
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  return (
    <div style={{ padding: "40px", maxWidth: "1200px", margin: "0 auto" }}>
      <Title level={3} style={{ textAlign: "center", color: "#FF6F3C" }}>
        Danh Sách Nhân Viên Yêu Thích
      </Title>
      {loading ? (
        <div style={{ textAlign: "center", padding: "40px" }}>
          <Spin size="large" />
        </div>
      ) : favoriteStaff.length === 0 ? (
        <Text style={{ textAlign: "center", display: "block" }}>
          Không có nhân viên yêu thích.
        </Text>
      ) : (
        favoriteStaff.map(
          ({
            _id,
            staffId: { _id: staffId, name, address, phone, avatar },
          }) => (
            <Card
              key={_id}
              style={{
                marginBottom: "20px",
                boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
                borderRadius: "10px",
              }}
            >
              <div style={{ display: "flex", alignItems: "center" }}>
                <img
                  src={
                    avatar ||
                    "https://i.pinimg.com/originals/94/e4/cb/94e4cb5ae194975f6dc84d1495c3abcd.gif"
                  }
                  alt={name}
                  style={{
                    width: "50px",
                    height: "50px",
                    borderRadius: "50%",
                    marginRight: "20px",
                    objectFit: "cover",
                  }}
                />
                <div style={{ flex: 1 }}>
                  <Title level={4} style={{ margin: 0, color: "#FF6F3C" }}>
                    {name}
                  </Title>
                  <div style={{ marginTop: "10px", lineHeight: "24px" }}>
                    <EnvironmentOutlined style={{ color: "#1890ff" }} />{" "}
                    <Text strong>Địa chỉ:</Text> {address}
                  </div>
                  <div style={{ marginTop: "5px", lineHeight: "24px" }}>
                    <PhoneOutlined style={{ color: "#1890ff" }} />{" "}
                    <Text strong>Số điện thoại:</Text>{" "}
                    {formatPhoneNumber(phone)}
                  </div>
                </div>
                <Button
                  type="primary"
                  danger
                  icon={<HeartFilled />}
                  onClick={() => handleRemoveFavorite(staffId)} // Sử dụng staffId ở đây
                >
                  Bỏ Yêu Thích
                </Button>
              </div>
            </Card>
          )
        )
      )}
      <Pagination
        current={currentPage}
        pageSize={limit}
        total={totalPages * limit}
        onChange={handlePageChange}
        showSizeChanger={false}
        style={{ textAlign: "center", marginTop: "20px" }}
      />
    </div>
  );
};

export default FavoriteStaff;
