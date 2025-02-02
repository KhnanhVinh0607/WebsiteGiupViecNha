import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateProfile, changePassword } from "../../services/userService";
import { updateUser } from "../../redux/actions/userActions";
import {
  Card,
  Tabs,
  Typography,
  Form,
  Input,
  Button,
  Divider,
  message,
} from "antd";

const { Title } = Typography;
const { TabPane } = Tabs;

const Profile = () => {
  const dispatch = useDispatch();
  const userInfo = useSelector((state) => state.user.userInfo);
  const [loading, setLoading] = useState(false);
  const [updateLoading, setUpdateLoading] = useState(false);

  // Gọi API để đổi mật khẩu
  const handlePasswordChange = async (values) => {
    setLoading(true);
    try {
      await changePassword(userInfo._id, {
        currentPassword: values.currentPassword,
        newPassword: values.newPassword,
      });
      message.success("Đổi mật khẩu thành công!");
    } catch (error) {
      message.error(error?.response?.data?.message);
    }
    setLoading(false);
  };

  // Gọi API để cập nhật thông tin cá nhân
  const handleInfoUpdate = async (values) => {
    setUpdateLoading(true);
    try {
      const updatedProfile = await updateProfile(userInfo._id, values);
      message.success(
        "Cập nhật thông tin thành công! Vui lòng đăng nhập lại để làm mới thông tin."
      );
      dispatch(updateUser(updatedProfile.payload));
    } catch (error) {
      message.error(error?.response?.data?.message);
    }
    setUpdateLoading(false);
  };

  return (
    <div style={{ padding: "40px", maxWidth: "800px", margin: "0 auto" }}>
      <Card>
        <Title level={3} style={{ textAlign: "center", color: "#FF6F3C" }}>
          Trang cá nhân
        </Title>

        <Tabs defaultActiveKey="1">
          {/* Tab Thông tin cá nhân */}
          <TabPane tab="Thông tin cá nhân" key="1">
            <Divider />
            <Form
              layout="vertical"
              initialValues={{
                name: userInfo.name,
                email: userInfo.email,
                phone: userInfo.phone,
                address: userInfo.address,
                role: userInfo.role,
              }}
              onFinish={handleInfoUpdate}
              style={{ maxWidth: "500px", margin: "0 auto" }}
            >
              <Form.Item label="Họ và tên" name="name">
                <Input style={{ height: "40px", borderColor: "#FF6F3C" }} />
              </Form.Item>

              <Form.Item label="Email" name="email">
                <Input
                  disabled
                  style={{ height: "40px", borderColor: "#FF6F3C" }}
                />
              </Form.Item>

              <Form.Item label="Số điện thoại" name="phone">
                <Input style={{ height: "40px", borderColor: "#FF6F3C" }} />
              </Form.Item>

              <Form.Item label="Địa chỉ" name="address">
                <Input style={{ height: "40px", borderColor: "#FF6F3C" }} />
              </Form.Item>

              <Form.Item>
                <Button
                  type="primary"
                  htmlType="submit"
                  loading={updateLoading}
                  style={{ backgroundColor: "#FF6F3C", borderColor: "#FF6F3C" }}
                >
                  Cập nhật thông tin
                </Button>
              </Form.Item>
            </Form>
          </TabPane>

          {/* Tab Đổi mật khẩu */}
          <TabPane tab="Đổi mật khẩu" key="2">
            <Divider />
            <Form
              layout="vertical"
              onFinish={handlePasswordChange}
              style={{ maxWidth: "500px", margin: "0 auto" }}
            >
              <Form.Item
                label="Mật khẩu hiện tại"
                name="currentPassword"
                rules={[
                  {
                    required: true,
                    message: "Vui lòng nhập mật khẩu hiện tại!",
                  },
                ]}
              >
                <Input.Password
                  style={{ height: "40px", borderColor: "#FF6F3C" }}
                  placeholder="Nhập mật khẩu hiện tại"
                />
              </Form.Item>

              <Form.Item
                label="Mật khẩu mới"
                name="newPassword"
                rules={[
                  { required: true, message: "Vui lòng nhập mật khẩu mới!" },
                ]}
              >
                <Input.Password
                  style={{ height: "40px", borderColor: "#FF6F3C" }}
                  placeholder="Nhập mật khẩu mới"
                />
              </Form.Item>

              <Form.Item
                label="Xác nhận mật khẩu mới"
                name="confirmPassword"
                dependencies={["newPassword"]}
                rules={[
                  {
                    required: true,
                    message: "Vui lòng xác nhận mật khẩu mới!",
                  },
                  ({ getFieldValue }) => ({
                    validator(_, value) {
                      if (!value || getFieldValue("newPassword") === value) {
                        return Promise.resolve();
                      }
                      return Promise.reject(new Error("Mật khẩu không khớp!"));
                    },
                  }),
                ]}
              >
                <Input.Password
                  style={{ height: "40px", borderColor: "#FF6F3C" }}
                  placeholder="Xác nhận mật khẩu mới"
                />
              </Form.Item>

              <Form.Item>
                <Button
                  type="primary"
                  htmlType="submit"
                  loading={loading}
                  style={{ backgroundColor: "#FF6F3C", borderColor: "#FF6F3C" }}
                >
                  Đổi mật khẩu
                </Button>
              </Form.Item>
            </Form>
          </TabPane>
        </Tabs>
      </Card>
    </div>
  );
};

export default Profile;
