import Layout from '../components/common/layout'
import styles from '../styles/Home.module.css'
import isValideJson from '../lib/utils/validation'
import convertJsonToRaml from '../lib/service/convertJsonToRamlDataType'

export default function Index() {
  const beautify = (e) => {
    const inputBody = document.querySelector(e.target.getAttribute("data-input"))
    if (isValideJson(inputBody.value)) {
      inputBody.value = JSON.stringify(JSON.parse(inputBody.value), null, 4)
      inputBody.classList.remove('border-red')
    } else {
      inputBody.classList.add('border-red')
    }
  }

  const convertBody = (e) => {
    const inputBody = document.querySelector(e.target.getAttribute("data-input"))
    const outputBody = document.querySelector("#outputBody")
    const makeRequired = document.querySelector("#makeRequired")
    const addExample = document.querySelector("#addExample")
    outputBody.value = convertJsonToRaml(inputBody.value, { "required": makeRequired.checked, "example": addExample.checked })
  }

  const copyClipboard = (e) => {
    navigator.clipboard.writeText(document.querySelector("#outputBody").value);
    const firstValeuButtonCopy = e.innerHTML
    const valueChangeButtonCopy = `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-check2" viewBox="0 0 16 16">
        <path d="M13.854 3.646a.5.5 0 0 1 0 .708l-7 7a.5.5 0 0 1-.708 0l-3.5-3.5a.5.5 0 1 1 .708-.708L6.5 10.293l6.646-6.647a.5.5 0 0 1 .708 0z"/>
      </svg>`;
    e.innerHTML = valueChangeButtonCopy;
    setTimeout(function () {
      e.innerHTML = firstValeuButtonCopy;
    }, 1000);
    console.log(e.value)
  }

  return (
    <div className='container'>
      <div className="px-4 py-4 text-center flex-grow-1">
        <div className="row align-items-md-stretch">
          <div className="col-md-6">
            <div className="h-100 p-4 text-white bg-dark rounded-3">
              <div className="d-flex">
                <label className="form-label">JSON</label>
                <p onClick={beautify} data-input="#inputBody" className={styles.beautify}>Beautify</p>
              </div>
              <textarea className={styles.textarea} id="inputBody" rows="6" placeholder='{&#10;&#x09;"text":"Enter your JSON here..."&#10;}'></textarea>
              <div className="d-flex afterTextarea">
                <div>
                  <div className="form-check form-switch">
                    <input className="form-check-input" type="checkbox" role="switch" id="makeRequired" />
                    <label className="form-check-label" htmlFor="makeRequired">Make required</label>
                  </div>
                  <div className="form-check form-switch">
                    <input className="form-check-input" type="checkbox" role="switch" id="addExample" defaultChecked />
                    <label className="form-check-label" htmlFor="addExample">Add example</label>
                  </div>
                </div>
                <button onClick={convertBody} id="wsSendButton" type="button" data-input="#inputBody"
                  className="btn btn-primary ms-auto">Converter</button>
              </div>
            </div>
          </div>
          <div className="col-md-6">
            <div className="h-100 p-4 bg-light border rounded-3 height-75">
              <div className="d-flex">
                <label className="form-label">DataType</label>
                <button className="btn btn-secondary ms-auto" onClick={copyClipboard} data-input="#outputBody">
                  <svg xmlns="http://www.w3.org/2000/svg" width="17" height="17" fill="currentColor" className="bi bi-clipboard" viewBox="0 0 16 16">
                    <path d="M4 1.5H3a2 2 0 0 0-2 2V14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V3.5a2 2 0 0 0-2-2h-1v1h1a1 1 0 0 1 1 1V14a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1V3.5a1 1 0 0 1 1-1h1v-1z"></path>
                    <path d="M9.5 1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-3a.5.5 0 0 1-.5-.5v-1a.5.5 0 0 1 .5-.5h3zm-3-1A1.5 1.5 0 0 0 5 1.5v1A1.5 1.5 0 0 0 6.5 4h3A1.5 1.5 0 0 0 11 2.5v-1A1.5 1.5 0 0 0 9.5 0h-3z"></path>
                  </svg>
                </button>
              </div>
              <textarea className={styles.textarea} id="outputBody" rows="6"></textarea>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

Index.getLayout = function getLayout(page) {
  return (
    <Layout>
      {page}
    </Layout>
  )
}