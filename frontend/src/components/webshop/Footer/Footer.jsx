import "./Footer.css"



export function Footer() {


  return(
    <>
        <footer className="footer">
            <div className="info">
                <span>Cím: ...</span>
                <span>E-mail: ...</span>
                <span>Telefonszám: ...</span>
            </div>
            <div className="contactMe">
                <a href="/contact">Lépj velünk kapcsolatba!</a>
            </div>
            <div className="social">
                <a>Facebook</a>
                <a>Instagram</a>
                <a>Twitter</a>
            </div>
        </footer>
    </>
)
}
