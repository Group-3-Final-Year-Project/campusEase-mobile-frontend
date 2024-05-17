import * as yup from "yup";
import { useFormik } from "formik";

type CustomFormikProps = {
  initialValues: object;
  validationSchema: yup.ObjectSchema<TIn, TContext, TDefault, TFlags>;
  onSumbit?: (values: object) => void;
};

const useCustomFormik = (props: CustomFormikProps) => {
  const formik = useFormik({
    initialValues: props.initialValues,
    validationSchema: props.validationSchema,
    onSubmit: (values, { resetForm }) => {
      resetForm();
    },
  });
  return formik;
};

export default useCustomFormik;
