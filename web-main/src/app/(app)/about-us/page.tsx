import LinkedInIcon from '@mui/icons-material/LinkedIn';
import GitHubIcon from '@mui/icons-material/GitHub';
import Image from 'next/image';
import teamMembers from '@/constants/team';
import { Box } from '@mui/material';

const AboutUs = () => {
  return (
    <Box p={4} className="min-h-screen py-12 flex justify-center items-center">
      <Box maxWidth="md" width="100%">

        <h1 className="text-4xl font-bold mt-4 text-black text-center dark:text-white">
          JalSync
        </h1>

        <section className="mb-12">
          <h2 className="text-2xl font-semibold mb-4 text-black text-left dark:text-white">
            Our Vision
          </h2>
          <p className="text-gray-700">
            At JalSync, we envision a future where every rural household in India has access to safe and sustainable drinking water. Our goal is to support the Jal Jeevan Mission by providing an innovative, user-friendly tool that empowers Gram Panchayats and Public Health Engineering Department (PHED) personnel to efficiently manage and maintain drinking water supply schemes.
          </p>
        </section>

        <section className="mb-12">
          <h2 className="text-2xl font-semibold mb-4 text-black text-left dark:text-white">
            The Problem We&apos;re Solving
          </h2>
          <p className="text-gray-700">
            The Jal Jeevan Mission faces challenges in the efficient operation and maintenance of drinking water supply schemes at the village level. Gram Panchayats and PHED personnel need a comprehensive tool to manage assets, inventories, and finances related to water supply infrastructure. JalSync addresses this need by providing a mobile-based application that streamlines these processes, ensuring the sustainability and effectiveness of rural water supply systems.
          </p>
        </section>

        <section className="mb-12">
          <h2 className="text-2xl font-semibold mb-4 text-black text-left dark:text-white">
            Our Solution
          </h2>
          <p className="text-gray-700">
            JalSync is a comprehensive mobile-based application designed to support the operation and maintenance of drinking water supply schemes:
          </p>
          <ul className="list-disc list-inside mt-4 text-gray-700">
            <li>GIS-based asset management for water supply infrastructure</li>
            <li>Detailed asset information storage and tracking</li>
            <li>Inventory management for consumables with demand forecasting</li>
            <li>Financial management including receipt recording and expenditure tracking</li>
            <li>Consumer list management and bill generation</li>
            <li>Integrated payment gateway with UPI, Net Banking, and Credit card options</li>
            <li>User-friendly interface with local language support</li>
            <li>Easily procurable and operable by Gram Panchayats</li>
          </ul>
        </section>

        <section className="mb-12">
          <h2 className="text-2xl font-semibold mb-4 text-black text-left dark:text-white">
            Meet Our Team
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {teamMembers.map((member, index) => (
              <div key={index} className="bg-gray-100 p-6 rounded-lg shadow-md">
                <Image src={member.image} width={32} height={32} alt={member.name} className="rounded-full mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-center">{member.name}</h3>
                <p className="text-gray-600 text-center mb-2">{member.role}</p>
                <div className="flex justify-center space-x-4">
                  {member.social.linkedin && (
                    <a title='linkedin' href={member.social.linkedin} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:text-blue-800">
                      <LinkedInIcon fontSize="small" />
                    </a>
                  )}
                  {member.social.github && (
                    <a title='github' href={member.social.github} target="_blank" rel="noopener noreferrer" className="text-gray-800 hover:text-black">
                      <GitHubIcon fontSize="small" />
                    </a>
                  )}
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className="mb-12">
          <h2 className="text-2xl font-semibold mb-4 text-black text-left dark:text-white">
            Our Impact
          </h2>
          <p className="text-gray-700">
            JalSync aims to achieve the following impacts:
          </p>
          <ul className="list-disc list-inside mt-4 text-gray-700">
            <li>Improve the efficiency of water supply scheme management at the village level</li>
            <li>Enhance the sustainability of rural drinking water infrastructure</li>
            <li>Streamline financial processes for Gram Panchayats</li>
            <li>Increase transparency in water supply operations</li>
            <li>Support the Jal Jeevan Mission in achieving its goal of providing safe and sustainable drinking water to all rural households</li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">Get Involved</h2>
          <ul className="list-disc list-inside mt-4 text-gray-700">
            <li>Check out our project on <a href="https://github.com/exploring-solver/JalSync" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">GitHub</a></li>
            <li>Contact your local Gram Panchayat to learn more about implementing JalSync in your village</li>
          </ul>
        </section>
      </Box >
    </Box >
  );
};

export default AboutUs;