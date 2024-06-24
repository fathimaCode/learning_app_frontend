import TextComponent from "../../components/TextComponent"
import ContainerComponent from "../../components/ContainerComponent"
import Card from 'react-bootstrap/Card';
import ButtonComponent from "../../components/ButtonComponent";
import * as Yup from 'yup'
import { useFormik } from "formik";
import { Link, useNavigate } from "react-router-dom";
import LoginCredentials from "../../model/authorised";
import { useDispatch} from "react-redux";
import { AppDispatch } from "../../store/store";
import { loginAuthentication } from "../../store/slice/userSlice";
import CommonNav from "../../components/commonNav";
import swal from 'sweetalert';

const LoginScreen: React.FC = () => {
    const navigate = useNavigate();
   
    const dispatch = useDispatch<AppDispatch>();

    const formik = useFormik({
        initialValues: {
            "email": "",
            "password": ""
        },
        validationSchema: Yup.object({
            email: Yup.string().email("Invalid email address").required("Email required"),
            password: Yup.string().required("Password is required")
        }),
        onSubmit: async (value, { resetForm }) => {
            console.log(value);
            const loginData: LoginCredentials = {
                email: value.email,
                password: value.password
            };
            if (loginData.email === "instructor@lms.com" && loginData.password === "instructor") {
                navigate("/instructor");
            } else {
                const resultAction = await dispatch(loginAuthentication(loginData));
                if (loginAuthentication.fulfilled.match(resultAction)) {
                    console.log("Login successful");
                    console.log(resultAction.payload.user._id);
                    localStorage.setItem("token", resultAction.payload.jwtToken);
                    localStorage.setItem("userid", resultAction.payload.user._id);
                    localStorage.setItem("username", resultAction.payload.user.username);
                    console.log("Token:", resultAction.payload.jwtToken);
                    navigate("/course");
                } else {
                    swal({
                        title: "Invalid email or password",
                      
                        icon: "error",
                    });
                }
            }
            resetForm();
        }
    });

    return (
        <>
            <CommonNav />
            <section id="contact" className="contact">
                <div className="container">
                    <div className="row mt-5 justify-content-center" data-aos="fade-up">
                        <div className="col-lg-10">
                            <Card body className="card_align">
                                <div className="logo_container">
                                    <h4>LMS Application</h4>
                                </div>
                                <p>Login Here</p>
                                <ContainerComponent className="container">
                                    <form onSubmit={formik.handleSubmit}>
                                        <div>
                                            <TextComponent
                                                className="text_class"
                                                placeholder="Email Address"
                                                type="text"
                                                {...formik.getFieldProps('email')}
                                            />
                                            {formik.touched && formik.errors.email ? (
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
                                            {formik.touched && formik.errors.password ? (
                                                <div className="error">{formik.errors.password}</div>
                                            ) : null}
                                        </div>
                                        <ButtonComponent type="submit" className="loginBtn">SignIn</ButtonComponent>
                                    </form>
                                </ContainerComponent>
                             
                                <p style={{ padding: "10px" }}>Need to create an account? <Link to="/register">click here</Link></p>
                            </Card>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
}

export default LoginScreen;
