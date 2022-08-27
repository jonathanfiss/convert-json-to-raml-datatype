export default function Header() {
    return (
        <header className="p-3 bg-white border-bottom">
            <div className="container">
                <div className="p-2">
                    <a href="/" className="text-dark text-decoration-none float-start">
                        <svg xmlns="http://www.w3.org/2000/svg" width="40" height="32" fill="currentColor" className="bi bi-arrow-left-right me-2" viewBox="0 0 16 16">
                            <path fillRule="evenodd" d="M1 11.5a.5.5 0 0 0 .5.5h11.793l-3.147 3.146a.5.5 0 0 0 .708.708l4-4a.5.5 0 0 0 0-.708l-4-4a.5.5 0 0 0-.708.708L13.293 11H1.5a.5.5 0 0 0-.5.5zm14-7a.5.5 0 0 1-.5.5H2.707l3.147 3.146a.5.5 0 1 1-.708.708l-4-4a.5.5 0 0 1 0-.708l4-4a.5.5 0 1 1 .708.708L2.707 4H14.5a.5.5 0 0 1 .5.5z" />
                        </svg>
                        <span className="fs-4">Convert JSON to RAML DataType</span>
                    </a>
                    {/* <div className="text-end float-end">
                        <button type="button" className="btn btn-warning">
                            Import fragment
                        </button>
                    </div> */}
                    <br />
                </div>
            </div>
        </header>
    );
};