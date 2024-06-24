import React, { useEffect, useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import Card from 'react-bootstrap/Card';
import TextComponent from "../../components/TextComponent";
import ContainerComponent from "../../components/ContainerComponent";
import ButtonComponent from "../../components/ButtonComponent";
import swal from 'sweetalert';
import { useDispatch } from "react-redux";
import { postUserDetails } from "../../store/slice/userSlice";
import { Link } from "react-router-dom";
import { UserInterface } from "../../model/user";
import { AppDispatch } from "../../store/store";
import CommonNav from "../../components/commonNav";

const RegisterScreen: React.FC = () => {
    const [successInfo, setSuccessInfo] = useState(false);

    const dispatch = useDispatch<AppDispatch>();
    const formik = useFormik({
        initialValues: {
            username: "",
            email: "",
            password: "",
            contact: ""
        },
        validationSchema: Yup.object({
            username: Yup.string().required("Username is required"),
            email: Yup.string().email("Invalid email address").required("Email is required"),
            password: Yup.string().min(8, "Password must be at least 8 characters").required("Password is required"),
            contact: Yup.string().required("Contact is required")
        }),
        onSubmit: (values, { resetForm }) => {
            console.log(values);
            if (formik.isValid) {
                const userData: UserInterface = {
                    username: values.username,
                    email: values.email,
                    password: values.password,
                    contact: values.contact
                };
                console.log(userData);
                dispatch(postUserDetails(userData));
                console.log(successInfo);
                setSuccessInfo(true);

                resetForm();
            }
        }
    });

   useEffect(() => {
        if (successInfo) {
            swal({
                title: "Account created successfully",
                text: "Ok",
                icon: "success",
            }).then(() => {
                setSuccessInfo(false);
            });
        }
    }, [successInfo]);

    return (
        <>
            <CommonNav />
            <Card body className="card_align_md">
                <div className="logo_container">
                    <h4>LMS Application</h4>
                </div>
                <p>Register Here</p>
                <ContainerComponent className="container">
                    <form onSubmit={formik.handleSubmit}>
                        <div>
                            <TextComponent
                                className="text_class"
                                placeholder="Username"
                                type="text"
                                {...formik.getFieldProps('username')}
                            />
                            {formik.touched.username && formik.errors.username ? (
                                <div className="error">{formik.errors.username}</div>
                            ) : null}
                        </div>
                        <div>
                            <TextComponent
                                className="text_class"
                                placeholder="Email Address"
                                type="text"
                                {...formik.getFieldProps('email')}
                            />
                            {formik.touched.email && formik.errors.email ? (
                                <div className="error">{formik.errors.email}</div>
                            ) : null}
                        </div>
                        <div>
                            <TextComponent
                                className="text_class"
                                placeholder="Password"
                                type="password"
                                {...formik.getFieldProps('password')}
                            />
                            {formik.touched.password && formik.errors.password ? (
                                <div className="error">{formik.errors.password}</div>
                            ) : null}
                        </div>
                        <div>
                            <TextComponent
                                className="text_class"
                                placeholder="Contact"
                                type="number"
                                {...formik.getFieldProps('contact')}
                            />
                            {formik.touched.contact && formik.errors.contact ? (
                                <div className="error">{formik.errors.contact}</div>
                            ) : null}
                        </div>
                        <ButtonComponent type="submit" className="loginBtn">
                            SignUp
                        </ButtonComponent>
                    </form>
                </ContainerComponent>
                <p style={{ padding: "10px" }}>Already have an account? <Link to="/login">click here</Link></p>
            </Card>
        </>
    );
};

export default RegisterScreen;
