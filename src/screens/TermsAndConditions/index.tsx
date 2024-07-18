import React from "react";
import { Container } from "../Home/styles";
import { Text } from "~components";
import { ScrollView } from "react-native";

const TermsAndConditions = () => {
  return (
    <Container>
      <ScrollView>
        <Text>
          Welcome to campusEase!{"\n\n"}These terms and conditions ("Terms",
          "Terms and Conditions") outline the rules and regulations for using
          the campusEase mobile application ("app", "campusEase app"). By
          accessing or using the app, you agree to be bound by these Terms and
          all applicable laws and regulations. If you disagree with any of these
          terms, you are prohibited from using the app. {"\n\n"}1. Terms of Use
          You must be at least 13 years old to use the app. You are responsible
          for maintaining the confidentiality of your account and password and
          for restricting access to your device. You agree to be responsible for
          all activities that occur under your account or password. You may not
          use the app for any illegal or unauthorized purpose. You may not
          violate any laws or regulations in your jurisdiction. {"\n\n"}2. User
          Content You are solely responsible for any content you upload, post,
          or share on the app ("User Content"). You represent and warrant that
          you have all rights to the User Content you upload. You grant
          campusEase a non-exclusive, royalty-free, worldwide license to use,
          reproduce, modify, publish, and distribute your User Content in
          connection with the app.{"\n\n"} 3. Disclaimers The app is provided
          "as is" and without warranty of any kind, express or implied.
          campusEase disclaims all warranties, including but not limited to, the
          implied warranties of merchantability, fitness for a particular
          purpose, and non-infringement. campusEase does not warrant that the
          app will function uninterrupted, secure, or error-free. campusEase
          does not warrant that the results that may be obtained from the use of
          the app will be accurate or reliable.{"\n\n"} 4. Limitations of
          Liability campusEase will not be liable for any damages arising out of
          or related to your use of the app. This includes but is not limited to
          direct, indirect, incidental, consequential, or punitive damages.
          {"\n\n"} 5. Term and Termination These Terms will remain in effect
          until terminated by you or campusEase. We may terminate these Terms or
          your access to the app for any reason, at any time, without notice.{" "}
          {"\n\n"}
          6. Governing Law These Terms will be governed by and construed in
          accordance with the laws of Germany, without regard to its conflict of
          law provisions. {"\n\n"}7. Changes to the Terms We reserve the right
          to update these Terms at any time. We will notify you of any changes
          by posting the new Terms on the app. You are advised to review these
          Terms periodically for any changes. {"\n\n"}8. Contact Us If you have
          any questions about these Terms, please contact us: By email: [your
          email address] By visiting this page on our app: [link to contact us
          page within the app] Please note: You may want to add specific terms
          regarding user-generated content, data privacy, and intellectual
          property. You should consult with a lawyer to ensure these Terms are
          compliant with all applicable laws and regulations.
        </Text>
      </ScrollView>
    </Container>
  );
};

export default TermsAndConditions;
