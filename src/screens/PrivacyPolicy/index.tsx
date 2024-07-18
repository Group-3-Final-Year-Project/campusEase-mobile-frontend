import React from "react";
import { Container } from "../Home/styles";
import { Text } from "~components";
import { ScrollView } from "react-native";

const PrivacyPolicy = () => {
  return (
    <Container>
      <ScrollView>
        <Text>
          CampuEase respects the privacy of our users. This Privacy Policy
          describes how we collect, use, and disclose your information in
          connection with your use of our mobile application, CampuEase (the
          "App"). {"\n\n"}Information We Collect We collect the following
          information about you: Personal Information: When you create an
          account on the App, you may provide us with certain personal
          information, such as your name, email address, and phone number
          (optional). {"\n\n"}Usage Data: We collect information about your use
          of the App, such as the features you access, the pages you visit, and
          the time you spend on the App. Device Information: We collect
          information about the device you use to access the App, such as the
          device type, operating system, IP address, and unique device
          identifier. {"\n\n"} How We Use Your Information We use the
          information we collect about you for the following purposes: To
          provide and operate the App To process your requests and transactions
          To personalize your experience with the App To send you promotional
          materials, newsletters, and other information (with your consent) To
          analyze how you use the App To improve the App and our services To
          comply with legal and regulatory obligations Sharing Your Information
          We may share your information with third-party service providers who
          help us operate the App and provide our services. These third-party
          service providers are obligated to protect your information and use it
          only for the purposes we specify. We may also disclose your
          information if required to do so by law or in the good faith belief
          that such disclosure is necessary to comply with a court order,
          subpoena, or other legal process; to enforce our policies; to protect
          the rights, property, or safety of us or others; or to prevent fraud
          or other illegal activity. Data Retention We will retain your
          information for as long as your account is active or as needed to
          provide you with the services. We may also retain your information for
          legal, accounting, or other business purposes. Your Choices You can
          access and update your personal information through the settings on
          the App. You can also opt out of receiving promotional communications
          from us by following the unsubscribe instructions in those
          communications. Children's Privacy The App is not intended for
          children under the age of 13. We do not knowingly collect personal
          information from children under 13. If you are a parent or guardian
          and you believe that your child has provided us with personal
          information, please contact us. {"\n\n"} We will take steps to delete
          the information from our servers. Security We take reasonable measures
          to protect your information from unauthorized access, disclosure,
          alteration, or destruction. However, no internet or electronic storage
          system is completely secure. We cannot guarantee the security of your
          information. Changes to this Privacy Policy We may update this Privacy
          Policy from time to time. We will notify you of any changes by posting
          the new Privacy Policy on the App. You are advised to review this
          Privacy Policy periodically for any changes. Contact Us If you have
          any questions about this Privacy Policy, please contact us at:
          [campusease.services@gmail.com]
        </Text>
      </ScrollView>
    </Container>
  );
};

export default PrivacyPolicy;
