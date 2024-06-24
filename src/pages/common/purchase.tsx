
import CommonNav from "../../components/commonNav"
import data from "../../course_content/data.json"
import Button from 'react-bootstrap/Button';
import { PurchaseInterface } from "../../model/purchase";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../store/store";
import { postPurchaseDetails } from "../../store/slice/purchaseSlice";
import { useNavigate } from "react-router-dom";
import Utils from "./utils";
import swal from 'sweetalert';
const PurchasePage: React.FC = () => {
    const dispatch = useDispatch<AppDispatch>()
    const navigate = useNavigate()
    const productId = localStorage.getItem("purchaseId")
    console.log(productId)
    const userId = localStorage.getItem("userid")
    
    const currentDate =new Utils().getCurrentDate()
    const productInfo = data.courses.filter(course => course.courseId == productId)
    console.log(productInfo)
    function payment(): void {
        if (userId && productId) {
            const paymentInfo: PurchaseInterface = {
                userid: userId,
                courseid: productId,
                purchased_at: currentDate
            }
            //check already purchased

            dispatch(postPurchaseDetails(paymentInfo))
            swal({
                title: "Payment proceed successfully",
              
                icon: "success",
            });
            navigate('/course')
        }

    }

    return (
        <>
            <CommonNav />
            <div className="product_info">
                <div className="product_card">
                    <img src={productInfo[0].image} alt="" className="product_image" />
                </div>
                <div className="product_details">
                    <h1>{productInfo[0].title}</h1>
                    <h6>{productInfo[0].description}</h6>
                    <h5>Rs. {productInfo[0].price}</h5>
                    <h3>CLMS: {productInfo[0].courseId}</h3>
                    <h4>Total Chapters: {productInfo[0].chapters.length}</h4>
                    <h4>Quiz: {productInfo[0].quizzes.length > 0 ? "Yes" : "No"}</h4>
                    <Button variant="outline-success" onClick={() => payment()}>Proceed Payment</Button>
                </div>

            </div>

        </>
    )
}

export default PurchasePage