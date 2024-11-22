import axios from "axios";
import React, { useEffect, useState } from "react";
import { BsAndroid, BsApple, BsWordpress } from "react-icons/bs";
import { DiMagento } from "react-icons/di";
import { RiSeoFill } from "react-icons/ri";
import { SiOdoo } from "react-icons/si";
import { FiMonitor } from "react-icons/fi";



const ServiceList = [
  {
    icon: <BsWordpress />,
    title: "Wordpress Development",
    description: "Corporate, Business, Agency",
  },
  {
    icon: <SiOdoo />,
    title: "ODOO Development",
    description: "Complete Solution.",
  },
  {
    icon: <DiMagento />,
    title: "Magento Development",
    description: "E-Commerce, Retail, Electronics, Fashion.",
  },
  {
    icon: <BsAndroid />,
    title: "Mobile App Development",
    description: "Android Mobile Application.",
  },
  {
    icon: <BsApple />,
    title: "IOS Development",
    description: "IOS Mobile Application.",
  },
  {
    icon: <RiSeoFill />,
    title: "Search Engine Optimization",
    description: "On/Off Page SEO Landing Page",
  },
  {
    icon: <FiMonitor />,
    title: "Digital Marketing",
    description: "Digital Marketing, Events, Social Media, Tickets",
  },
];
/*****************************************
dynamically Show Services on Service Page
*****************************************/
const ServiceThree = ({ column, item }) => {
    const [servicesData, setServicesData] = useState([]);
  
    useEffect(() => {
      const fetchServices = async () => {
        try {
          const response = await axios.get(import.meta.env.VITE_API_API_GET_SERVICES);
        //   console.log(response.data.services);
          setServicesData(response.data.services);
        } catch (error) {
          console.error("Error fetching services data:", error);
        }
      };
  
      fetchServices();
    }, []);
  
    // Limit services to the number specified by "item"
    const ServiceContent = servicesData.slice(0, item);
  
    return (
      <div className="row">
        {ServiceContent.map((service, i) => (
          <div className={`${column}`} key={i}>
            <a href="/service-details">
              <div className="service service__style--2">
                {/* Display the service image */}
                <div className="icon">
                  <img src={service.image} alt={service.title} style={{ width: "600px" }} />
                </div>
                <div className="content">
                  <h3 className="title">{service.title}</h3>
                  <p>{service.shortDescription}</p>
                </div>
              </div>
            </a>
          </div>
        ))}
      </div>
    );
  };
  

export default ServiceThree;
