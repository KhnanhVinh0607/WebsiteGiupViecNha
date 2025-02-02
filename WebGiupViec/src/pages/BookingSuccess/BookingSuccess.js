import React, { useEffect, useState } from "react";
import { useLocation, useParams } from "react-router-dom";
import { Card, Row, Col, Typography, Divider, Spin } from "antd";
import {
  getBookingById,
  sendCustomerEmail,
  sendStaffEmail,
} from "../../services/bookingService"; // Import các API cần thiết
import checkmarkImage from "../../image/success.png"; // Đường dẫn đến ảnh xác nhận
import calendarImage from "../../image/calendar.png"; // Đường dẫn đến ảnh lịch
import { formatCurrency } from "../../utils/formatCurrency";

const { Title, Text } = Typography;

const BookingSuccess = () => {
  const location = useLocation();
  const { bookingId } = useParams(); // Lấy bookingId từ URL
  const [bookingData, setBookingData] = useState(location.state || null); // Dùng dữ liệu từ state nếu có sẵn
  const [loading, setLoading] = useState(!location.state);
  // useEffect đầu tiên để tải dữ liệu và hiển thị booking
  useEffect(() => {
    const fetchBookingData = async () => {
      try {
        setLoading(true);
        const data = await getBookingById(bookingId);
        setBookingData(data);
      } catch (error) {
        console.error("Không thể lấy thông tin lịch hẹn:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchBookingData();
  }, []);

  // useEffect thứ hai để gửi email sau khi bookingData đã tải xong
  useEffect(() => {
    if (bookingData) {
      const sendEmails = async () => {
        try {
          await Promise.all([
            sendCustomerEmail(bookingId),
            sendStaffEmail(bookingId),
          ]);
        } catch (error) {
          console.error("Lỗi khi gửi email:", error);
        }
      };
      sendEmails();
    }
  }, []);

  if (loading) {
    return (
      <Spin
        size="large"
        style={{ display: "flex", justifyContent: "center", padding: "40px" }}
      />
    );
  }

  if (!bookingData) {
    return <p>Không tìm thấy thông tin lịch hẹn.</p>;
  }

  // Format ngày và giờ từ bookingTime
  const bookingDate = new Date(bookingData.bookingTime);
  const day = bookingDate.toLocaleDateString("vi-VN", { weekday: "long" });
  const dateFormatted = bookingDate.toLocaleDateString("vi-VN", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  });
  const startTime = bookingDate.toLocaleTimeString("vi-VN", {
    hour: "2-digit",
    minute: "2-digit",
  });

  return (
    <div style={{ display: "flex", justifyContent: "center", padding: "40px" }}>
      <Card
        style={{
          width: "100%",
          maxWidth: "600px",
          borderRadius: "10px",
          textAlign: "center",
        }}
      >
        <img
          src={checkmarkImage}
          alt="Xác nhận thành công"
          style={{ width: "48px", height: "48px" }}
        />
        <Title level={2} style={{ marginTop: 10 }}>
          Đặt lịch hẹn thành công!
        </Title>
        <Text style={{ fontSize: "16px", color: "#555" }}>
          Chúng tôi đã gửi thông tin chi tiết của bạn qua email.
        </Text>

        <Divider />

        {/* Chi tiết lịch hẹn theo dạng lịch với ảnh */}
        <Row justify="center" align="middle">
          <Col style={{ textAlign: "center" }}>
            <div style={{ display: "flex", alignItems: "center" }}>
              <img
                src={calendarImage}
                alt="Lịch"
                style={{
                  width: "60px",
                  height: "60px",
                  marginRight: "15px",
                }}
              />
              <div style={{ textAlign: "left" }}>
                <Text style={{ fontSize: "16px", fontWeight: "bold" }}>
                  Thời gian: {startTime}
                </Text>
                <br />
                <Text style={{ fontSize: "16px", color: "#555" }}>
                  Ngày: {day}, {dateFormatted}
                </Text>
              </div>
            </div>
          </Col>
        </Row>

        <Divider />

        {/* Thông tin chi tiết */}
        <Row
          gutter={[16, 16]}
          style={{ marginBottom: "16px", textAlign: "center" }}
        >
          <Col span={8}>
            <Text style={{ fontSize: "16px", fontWeight: "bold" }}>
              Dịch vụ
            </Text>
            <br />
            <Text style={{ fontSize: "16px", color: "#555" }}>
              {bookingData.serviceId.serviceName}
            </Text>
          </Col>
          <Col span={8}>
            <Text style={{ fontSize: "16px", fontWeight: "bold" }}>
              Nhân viên
            </Text>
            <br />
            <Text style={{ fontSize: "16px", color: "#555" }}>
              {bookingData.preferredStaffId.name}
            </Text>
          </Col>
          <Col span={8}>
            <Text style={{ fontSize: "16px", fontWeight: "bold" }}>
              Khách hàng
            </Text>
            <br />
            <Text style={{ fontSize: "16px", color: "#555" }}>
              {bookingData.customerId.name}
            </Text>
          </Col>
        </Row>

        {/* Chi phí dự kiến */}
        <Row
          justify="center"
          style={{ marginTop: "16px", textAlign: "center" }}
        >
          <Col>
            <Text style={{ fontSize: "16px", fontWeight: "bold" }}>
              Chi phí dự kiến:
            </Text>
            <br />
            <Text style={{ fontSize: "18px", color: "#4CAF50" }}>
              {formatCurrency(bookingData.totalCost)}
            </Text>
          </Col>
        </Row>

        {/* Địa chỉ khách hàng */}
        <Row
          justify="center"
          style={{ marginTop: "16px", textAlign: "center" }}
        >
          <Col>
            <Text style={{ fontSize: "16px", fontWeight: "bold" }}>
              Địa chỉ khách hàng:
            </Text>
            <br />
            <Text style={{ fontSize: "16px", color: "#555" }}>
              {bookingData.customerAddress}
            </Text>
          </Col>
        </Row>

        <Divider />

        <Text style={{ fontSize: "16px", color: "#555" }}>
          Cảm ơn bạn đã sử dụng dịch vụ của chúng tôi!
        </Text>
      </Card>
    </div>
  );
};

export default BookingSuccess;
