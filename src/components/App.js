import React, { Component } from "react";
import Header from "./Bootstrap/Header";
import Split from "react-split";
import Code from "./Code";
import Form from "./Form";
import he from "he";
import Preview from "./Preview";

class App extends Component {
  state = {
    Dark: false,
    FormData: {
      FirstName: "",
      LastName: "",
      Thubmnail: "",
      URL: "",
      Description: "",
      Keywords: "",
      Address: "",
      Phone: "",
      Email: "",
      Instagram: "",
      Twitter: "",
      LinkedIn: "",
      GitHub: "",
      Colour: "#1b1b2f",
    },
    fileDownloadUrl: null,
    PreviewMode: false,
  };

  handleChange = (e) => {
    this.setState({
      FormData: {
        ...this.state.FormData,
        [e.target.name]: e.target.value,
      },
      PreviewMode: false,
    });
  };

  download = () => {
    let output = he.decode(
      document.getElementsByClassName("codefile")[0].innerHTML
    );
    const blob = new Blob([output]);
    const fileDownloadUrl = URL.createObjectURL(blob);
    this.setState({ fileDownloadUrl: fileDownloadUrl }, () => {
      this.doFileDownload.click();
      URL.revokeObjectURL(fileDownloadUrl);
      this.setState({ fileDownloadUrl: "" });
    });
  };

  render() {
    return (
      <div className="App container">
        <Header dark={this.state.Dark} className="Header">
          <span>
            <b>Profia: </b>Portfolio Generator
          </span>
        </Header>
        <div className="container-fluid">
          <Split className="split">
            <div className="p-3 form__group scroll">
              <Form
                FormData={{
                  FullName: `${this.state.FormData.FirstName} ${this.state.FormData.LastName}`,
                  ...this.state.FormData,
                }}
                onChange={this.handleChange}
              />
              <button
                className="btn btn-success"
                onClick={() => {
                  this.download();
                }}
                disabled={this.state.PreviewMode}
                title="Download HTML page for your portfolio."
              >
                Download
              </button>
              <a
                className="d-none"
                download={"portfolio.html"}
                href={this.state.fileDownloadUrl}
                ref={(e) => (this.doFileDownload = e)}
              >
                Download
              </a>
            </div>
            <div className="p-3 scroll">
              <ul className="nav nav-tabs mb-2">
                <li className="nav-item">
                  <span
                    className={
                      "nav-link " + (!this.state.PreviewMode ? "active" : "")
                    }
                    onClick={(e) => {
                      e.preventDefault();
                      this.setState({
                        PreviewMode: false,
                      });
                    }}
                  >
                    Code
                  </span>
                </li>
                <li className="nav-item">
                  <span
                    className={
                      "nav-link " + (this.state.PreviewMode ? "active" : "")
                    }
                    onClick={(e) => {
                      e.preventDefault();
                      this.setState({
                        PreviewMode: true,
                      });
                    }}
                  >
                    Preview
                  </span>
                </li>
              </ul>
              {this.state.PreviewMode ? (
                <Preview
                  {...this.state.FormData}
                  FullName={`${this.state.FormData.FirstName} ${this.state.FormData.LastName}`}
                />
              ) : (
                <code>
                  <Code
                    {...this.state.FormData}
                    FullName={`${this.state.FormData.FirstName} ${this.state.FormData.LastName}`}
                  />
                </code>
              )}
            </div>
          </Split>
        </div>
      </div>
    );
  }
}

export default App;
