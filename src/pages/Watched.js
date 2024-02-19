import Wrapper from "../wrapper";
import "../CSS/watched.css";

function Watched(){
    return (
        <Wrapper>
            <div className="Watched">
                <div className="inner-watch">
                    <div className="count-cart">CART</div>
                    <div className="show-product">최근 본 상품
                    <div className="productName">
                        {localStorage.getItem('watched')}
                    </div>
                    </div>
                    <div className="up">TOP
                        <span class="material-symbols-outlined">arrow_drop_up</span>
                    </div>
                </div>
            </div>
        </Wrapper>
    )

}

export default Watched;