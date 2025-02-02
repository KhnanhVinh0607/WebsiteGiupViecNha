import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { Card, Row, Col, Typography, Button, Divider, message } from "antd";
import { useNavigate } from "react-router-dom";
import {
  RemoveFromWishlist,
  clearWishlist,
} from "../../redux/actions/wishlistActions";
import { formatCurrency } from "../../utils/formatCurrency";
import { CloseOutlined } from "@ant-design/icons";

const { Title, Text } = Typography;

const WishList = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const wishlist = useSelector((state) => state.wishlist.wishlist);

  const handleRemoveFromWishlist = (id) => {
    dispatch(RemoveFromWishlist(id));
    message.success("Đã xóa dịch vụ khỏi danh sách yêu thích.");
  };

  const handleClearWishlist = () => {
    dispatch(clearWishlist());
    message.success("Đã xóa tất cả dịch vụ khỏi danh sách yêu thích.");
  };

  return (
    <div style={{ padding: "40px", maxWidth: "1200px", margin: "0 auto" }}>
      <Title level={2} style={{ textAlign: "center", color: "#ff6f3c" }}>
        Danh sách yêu thích
      </Title>

      <Divider />

      {wishlist.length === 0 ? (
        <div style={{ textAlign: "center", padding: "40px" }}>
          <Text>Không có dịch vụ nào trong danh sách yêu thích.</Text>
        </div>
      ) : (
        <div>
          <Row gutter={[16, 16]}>
            {wishlist.map((item) => (
              <Col xs={24} sm={12} md={8} lg={6} key={item._id}>
                <Card
                  hoverable
                  onClick={() =>
                    navigate("/hourly", { state: { service: item } })
                  }
                  cover={
                    <img
                      alt={item.serviceName}
                      src={item.images[0]}
                      style={{ height: "200px", objectFit: "cover" }}
                    />
                  }
                  actions={[
                    <Button
                      type="text"
                      icon={<CloseOutlined />}
                      onClick={(e) => {
                        e.stopPropagation();
                        handleRemoveFromWishlist(item._id);
                      }}
                      style={{ color: "#ff4d4f" }}
                    >
                      Xóa
                    </Button>,
                  ]}
                  style={{
                    borderRadius: "8px",
                    overflow: "hidden",
                    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
                  }}
                >
                  <Title level={5} style={{ marginBottom: "10px" }}>
                    {item.serviceName}
                  </Title>
                  <Text>{item.shortDescription}</Text>
                  <Divider />
                  <Text strong>{formatCurrency(item.basePrice)}</Text>
                </Card>
              </Col>
            ))}
          </Row>

          <div style={{ textAlign: "center", marginTop: "20px" }}>
            <Button
              type="primary"
              danger
              onClick={handleClearWishlist}
              style={{ backgroundColor: "#ff4d4f", borderColor: "#ff4d4f" }}
            >
              Xóa tất cả
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default WishList;
