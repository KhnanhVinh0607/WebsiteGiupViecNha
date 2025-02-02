import React from "react";
import { BiRocket } from "react-icons/bi";
import { AiOutlineSync } from "react-icons/ai";
import { GoCreditCard } from "react-icons/go";
import { ImBubbles3, ImGift } from "react-icons/im";

const Advantages = () => {
  const AdvantagesData = [
    {
      id: 1,
      icon: <BiRocket />,
      title: "Dịch Vụ Nhanh Chóng",
      paragraph: "Đảm bảo dịch vụ nhanh chóng và đúng giờ",
    },
    {
      id: 2,
      icon: <AiOutlineSync />,
      title: "Đổi Lịch Linh Hoạt",
      paragraph: "Thay đổi lịch dịch vụ dễ dàng",
    },
    {
      id: 3,
      icon: <GoCreditCard />,
      title: "Thanh Toán An Toàn",
      paragraph: "Hỗ trợ thanh toán trực tuyến an toàn",
    },
    {
      id: 4,
      icon: <ImBubbles3 />,
      title: "Hỗ Trợ Khách Hàng 24/7",
      paragraph: "Luôn sẵn sàng hỗ trợ bạn bất cứ lúc nào",
    },
    {
      id: 5,
      icon: <ImGift />,
      title: "Ưu Đãi Đặc Biệt",
      paragraph: "Nhiều ưu đãi cho khách hàng thân thiết",
    },
  ];

  return (
    <section id="advantages">
      <div className="container">
        <div className="advantages-items-wrapper">
          <ul>
            {AdvantagesData.map((item) => (
              <li key={item.id}>
                <div className="advantages-item">
                  <div className="icon-wrapper">
                    <span>{item.icon}</span>
                  </div>
                  <div className="text-wrapper">
                    <h5>{item.title}</h5>
                    <p>{item.paragraph}</p>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
};

export default Advantages;
