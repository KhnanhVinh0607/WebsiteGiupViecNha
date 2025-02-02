import crypto from "crypto";
import bcrypt from "bcrypt";
import nodemailer from "nodemailer";
import User from "../models/user.model.js";
import { ApiResponse } from "../utils/ApiResponse.js";

export const forgotPassword = async (req, res) => {
  const { email } = req.body;
  console.log(email);
  try {
    // Kiểm tra email có tồn tại không
    const user = await User.findOne({ email });
    if (!user) {
      return res
        .status(404)
        .send(
          new ApiResponse(
            404,
            null,
            "Email không tồn tại, vui lòng kiểm tra lại!"
          )
        );
    }

    // Tạo token đặt lại mật khẩu và mã hóa nó
    const token = crypto.randomBytes(20).toString("hex");
    const hashedToken = await bcrypt.hash(token, 10);

    // Lưu token mã hóa và thời gian hết hạn vào tài khoản người dùng
    user.resetPasswordToken = hashedToken;
    user.resetPasswordExpires = Date.now() + 3600000; // Thời hạn 1 giờ
    await user.save();

    // Tạo URL để người dùng đặt lại mật khẩu
    const resetUrl = `${process.env.FRONTEND_URL}/reset-password/${token}`;

    // Kiểm tra thông tin đăng nhập email
    if (!process.env.EMAIL_USER || !process.env.EMAIL_PASS) {
      console.error("Thiếu thông tin đăng nhập cho email.");
      return res
        .status(500)
        .send(
          new ApiResponse(
            500,
            null,
            "Không thể gửi email do thiếu thông tin đăng nhập."
          )
        );
    }

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    const mailOptions = {
      to: user.email,
      from: process.env.EMAIL_USER,
      subject: "Đặt lại mật khẩu",
      html: `
        <p>Bạn nhận được email này vì bạn (hoặc ai đó) đã yêu cầu đặt lại mật khẩu cho tài khoản của bạn.</p>
        <p>Vui lòng nhấp vào nút bên dưới hoặc sao chép liên kết và dán vào trình duyệt của bạn để hoàn tất quá trình trong vòng 1 giờ:</p>
        <a href="${resetUrl}" style="display: inline-block; padding: 10px 20px; font-size: 16px; color: white; background-color: #28a745; text-decoration: none; border-radius: 5px;">Đặt lại mật khẩu</a>
        <p>Nếu bạn không yêu cầu điều này, vui lòng bỏ qua email này và mật khẩu của bạn sẽ không bị thay đổi.</p>
        <p>Xin cảm ơn!</p>
      `,
    };

    await transporter.sendMail(mailOptions);

    res
      .status(200)
      .send(
        new ApiResponse(
          200,
          null,
          "Liên kết đặt lại mật khẩu đã được gửi đến email của bạn."
        )
      );
  } catch (error) {
    console.error("Lỗi trong quá trình gửi email đặt lại mật khẩu", error);
    res
      .status(500)
      .send(
        new ApiResponse(500, null, "Gửi liên kết đặt lại mật khẩu thất bại.")
      );
  }
};

// Reset Password Controller
export const resetPassword = async (req, res) => {
  const { token, newPassword } = req.body;

  try {
    const user = await User.findOne({
      resetPasswordExpires: { $gt: Date.now() }, // Ensure token is not expired
    });

    if (!user) {
      return res
        .status(400)
        .send(new ApiResponse(400, null, "Invalid or expired reset token."));
    }

    // Compare the received token with the hashed token in the database
    const isTokenValid = await bcrypt.compare(token, user.resetPasswordToken);
    if (!isTokenValid) {
      return res
        .status(400)
        .send(new ApiResponse(400, null, "Invalid or expired reset token."));
    }

    // Update password and clear reset token fields
    user.password = await bcrypt.hash(newPassword, 10);
    user.resetPasswordToken = undefined;
    user.resetPasswordExpires = undefined;
    await user.save();

    res
      .status(200)
      .send(
        new ApiResponse(200, null, "Password has been reset successfully.")
      );
  } catch (error) {
    console.error("Error in reset password", error);
    res
      .status(500)
      .send(new ApiResponse(500, null, "Failed to reset password."));
  }
};
