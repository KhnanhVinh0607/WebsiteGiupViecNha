import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import {
  getBookingByUserId,
  cancelBooking,
} from "../../services/bookingService";
import { addFavoriteStaff } from "../../services/favoriteStaffService"; // Import the API function
import { formatCurrency } from "../../utils/formatCurrency";
import {
  Button,
  Card,
  Typography,
  message,
  Divider,
  Spin,
  Modal,
  Pagination,
  Input,
  Rate,
  Upload,
  Tag,
} from "antd";
import {
  CloseOutlined,
  EnvironmentOutlined,
  UserOutlined,
  CalendarOutlined,
  DollarOutlined,
  StarOutlined,
  HeartOutlined,
  UploadOutlined,
} from "@ant-design/icons";
import { createFeedback } from "../../services/feedbackService";

const { Title, Text } = Typography;

const generateStatus = (status) => {
  let color = "";
  let displayText = "";

  switch (status) {
    case "pending":
      color = "#FFA500"; // Màu cam
      displayText = "Đang chờ";
      break;
    case "approved":
      color = "#52C41A"; // Màu xanh lá cây
      displayText = "Đã xác nhận";
      break;
    case "completed":
      color = "#87D068"; // Màu xanh lục nhạt
      displayText = "Hoàn tất";
      break;
    case "rejected":
      color = "#FF4D4F"; // Màu đỏ
      displayText = "Đã từ chối";
      break;
    case "canceled":
      color = "#BFBFBF"; // Màu xám
      displayText = "Đã hủy";
      break;
    default:
      color = "#BFBFBF"; // Màu xám mặc định
      displayText = "Trạng thái khác";
  }

  return <Tag color={color}>{displayText}</Tag>;
};

const BookingHistory = () => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [isFeedbackModalVisible, setIsFeedbackModalVisible] = useState(false);
  const [loadingFeedback, setLoadingFeedback] = useState(false);
  const [feedbackData, setFeedbackData] = useState({
    rating: 0,
    comment: "",
    images: [],
  });
  const [selectedBooking, setSelectedBooking] = useState(null);
  const limit = 5;

  const userId = useSelector((state) => state.user.userInfo?._id);

  useEffect(() => {
    if (userId) {
      fetchBookings();
    }
  }, [userId, currentPage]);

  const fetchBookings = async () => {
    setLoading(true);
    try {
      const response = await getBookingByUserId(userId, currentPage, limit);
      setBookings(response.bookings);
      setTotalPages(response.totalPages);
    } catch (error) {
      message.error("Lỗi khi lấy lịch sử đặt lịch.");
    } finally {
      setLoading(false);
    }
  };

  const handleCancelBooking = async (bookingId) => {
    try {
      await cancelBooking(bookingId);
      message.success("Đã hủy đặt lịch thành công.");
      setBookings((prevBookings) =>
        prevBookings.map((booking) =>
          booking._id === bookingId
            ? { ...booking, status: "canceled" }
            : booking
        )
      );
    } catch (error) {
      message.error("Lỗi khi hủy đặt lịch.");
    }
  };

  const handleRateService = (booking) => {
    setSelectedBooking(booking);
    setIsFeedbackModalVisible(true);
  };

  const handleFeedbackSubmit = async () => {
    setLoadingFeedback(true);
    try {
      const formData = new FormData();
      formData.append("customerId", userId);
      formData.append("serviceId", selectedBooking.serviceInfo._id);
      formData.append("bookingId", selectedBooking._id);
      formData.append("userId", selectedBooking.preferredStaffInfo._id);
      formData.append("rating", feedbackData.rating);
      formData.append("comment", feedbackData.comment);
      feedbackData.images.forEach((file) => {
        formData.append("images", file.originFileObj);
      });

      await createFeedback(formData);
      message.success("Đánh giá dịch vụ thành công!");
      setIsFeedbackModalVisible(false);
      setFeedbackData({ rating: 0, comment: "", images: [] });
      fetchBookings();
    } catch (error) {
      message.error("Lỗi khi đánh giá dịch vụ.");
    } finally {
      setLoadingFeedback(false);
    }
  };

  const handleAddFavoriteStaff = async (staffId) => {
    try {
      await addFavoriteStaff(userId, staffId);
      message.success("Nhân viên đã được thêm vào danh sách yêu thích.");
      fetchBookings();
    } catch (error) {
      message.error("Lỗi khi thêm nhân viên vào danh sách yêu thích.");
    }
  };

  const showCancelConfirm = (bookingId) => {
    Modal.confirm({
      title: "Xác nhận hủy đặt lịch",
      content: "Bạn có chắc chắn muốn hủy đặt lịch này không?",
      okText: "Xác nhận",
      cancelText: "Hủy",
      onOk: () => handleCancelBooking(bookingId),
      okButtonProps: { danger: true },
      centered: true,
    });
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  return (
    <div style={{ padding: "40px", maxWidth: "1200px", margin: "0 auto" }}>
      <Title level={3} style={{ textAlign: "center", color: "#FF6F3C" }}>
        Lịch Sử Đặt Lịch
      </Title>
      <Divider />
      {loading ? (
        <div style={{ textAlign: "center", padding: "40px" }}>
          <Spin size="large" />
          <Text style={{ display: "block", marginTop: "10px" }}>
            Đang tải dữ liệu...
          </Text>
        </div>
      ) : bookings.length === 0 ? (
        <Text style={{ textAlign: "center", display: "block" }}>
          Không có lịch sử đặt lịch.
        </Text>
      ) : (
        bookings.map((booking) => {
          return (
            <Card
              key={booking._id}
              style={{
                marginBottom: "20px",
                boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
                borderRadius: "10px",
                overflow: "hidden",
              }}
              bodyStyle={{ padding: "20px" }}
            >
              <div style={{ display: "flex", gap: "20px" }}>
                <img
                  src={booking.serviceInfo?.images[0]}
                  alt={booking.serviceInfo?.serviceName}
                  style={{
                    width: "120px",
                    height: "120px",
                    objectFit: "cover",
                    borderRadius: "8px",
                  }}
                />
                <div style={{ flex: 1 }}>
                  <Title level={4} style={{ margin: 0, color: "#FF6F3C" }}>
                    {booking.serviceInfo.serviceName}
                  </Title>
                  <div style={{ marginTop: "10px", lineHeight: "24px" }}>
                    <EnvironmentOutlined style={{ color: "#1890ff" }} />{" "}
                    <Text strong>Địa chỉ:</Text> {booking.customerAddress}
                  </div>
                  <div style={{ marginTop: "5px", lineHeight: "24px" }}>
                    <UserOutlined style={{ color: "#1890ff" }} />{" "}
                    <Text strong>Nhân viên:</Text>{" "}
                    {booking.preferredStaffInfo
                      ? booking.preferredStaffInfo.name
                      : "Không có"}
                  </div>
                  <div style={{ marginTop: "5px", lineHeight: "24px" }}>
                    <CalendarOutlined style={{ color: "#1890ff" }} />{" "}
                    <Text strong>Thời gian:</Text>{" "}
                    {new Date(booking.bookingTime).toLocaleDateString("vi-VN")}{" "}
                    {new Date(booking.bookingTime).toLocaleTimeString("vi-VN")}
                  </div>
                  <div style={{ marginTop: "5px", lineHeight: "24px" }}>
                    <DollarOutlined style={{ color: "#1890ff" }} />{" "}
                    <Text strong>Chi phí dự tính:</Text>{" "}
                    {formatCurrency(booking.totalCost)}
                  </div>
                  <div style={{ marginTop: "5px" }}>
                    {generateStatus(booking?.status)}
                  </div>
                </div>
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    gap: "10px",
                  }}
                >
                  {booking.status === "pending" && (
                    <Button
                      type="primary"
                      danger
                      icon={<CloseOutlined />}
                      onClick={() => showCancelConfirm(booking._id)}
                      style={{
                        backgroundColor: "#ff4d4f",
                        borderColor: "#ff4d4f",
                      }}
                    >
                      Hủy
                    </Button>
                  )}
                  {booking.status === "completed" && (
                    <>
                      {!booking.feedbackExists && (
                        <Button
                          type="primary"
                          icon={<StarOutlined />}
                          onClick={() => handleRateService(booking)}
                        >
                          Đánh giá dịch vụ
                        </Button>
                      )}
                      {!booking.isFavorite && (
                        <Button
                          type="default"
                          icon={<HeartOutlined />}
                          onClick={() =>
                            handleAddFavoriteStaff(
                              booking.preferredStaffInfo._id
                            )
                          }
                        >
                          Thêm nhân viên vào danh sách yêu thích
                        </Button>
                      )}
                    </>
                  )}
                </div>
              </div>
            </Card>
          );
        })
      )}

      {/* Modal đánh giá dịch vụ */}
      <Modal
        title="Đánh giá dịch vụ"
        visible={isFeedbackModalVisible}
        onCancel={() => setIsFeedbackModalVisible(false)}
        onOk={handleFeedbackSubmit}
        okText={loadingFeedback ? <Spin /> : "Gửi đánh giá"}
        confirmLoading={loadingFeedback}
      >
        <Text strong>Số sao:</Text>
        <Rate
          onChange={(value) =>
            setFeedbackData((prev) => ({ ...prev, rating: value }))
          }
          value={feedbackData.rating}
        />
        <Text strong style={{ display: "block", marginTop: "10px" }}>
          Nhận xét:
        </Text>
        <Input.TextArea
          rows={4}
          value={feedbackData.comment}
          onChange={(e) =>
            setFeedbackData((prev) => ({ ...prev, comment: e.target.value }))
          }
        />
        <Text strong style={{ display: "block", marginTop: "10px" }}>
          Hình ảnh (tối đa 5):
        </Text>
        <Upload
          listType="picture"
          fileList={feedbackData.images}
          onChange={({ fileList }) =>
            setFeedbackData((prev) => ({
              ...prev,
              images: fileList.slice(0, 5),
            }))
          }
          beforeUpload={() => false}
          maxCount={5}
          multiple
        >
          <Button icon={<UploadOutlined />}>Tải lên</Button>
        </Upload>
      </Modal>

      {/* Điều khiển phân trang */}
      <div style={{ textAlign: "center", marginTop: "20px" }}>
        <Pagination
          current={currentPage}
          pageSize={limit}
          total={totalPages * limit}
          onChange={handlePageChange}
          showSizeChanger={false}
        />
      </div>
    </div>
  );
};

export default BookingHistory;
