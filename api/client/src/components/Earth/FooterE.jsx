export default function FooterE(props) {

    const{handleToggleModal,data} = props;

    return (
        <footer>
            <div className="bgGradient "></div>
            <div >
                <h1>Earth API</h1>
                <h2>Earth Imagery</h2>
            </div>
            <button onClick={handleToggleModal}><i className="fa-solid fa-circle-info"></i></button>
        </footer>
    )
}