import Layout from "../components/MyLayout.js";
import Router from "next/router";
import jsCookie from "js-cookie";
import {getLogin} from "../lib/utils";
import {createAccount} from "../lib/utils";

class Login extends React.Component {
	  constructor(props) {
		      super(props);
		      this.state = { username: "", password: "" };
		     
		    }

	  async handleUsername(evt) {
		      this.setState({username: evt.target.value});
		    }

	  async handleScreenname(evt) {
		      this.setState({screenname: evt.target.value});
		    }

	  async handlePassword(evt) {
		      this.setState({password: evt.target.value});
		    }

	  async handleCreateUser(evt) {
		      console.log("button clicked");

		      const cuser = await createAccount({
			            username: this.state.username,
			            password: this.state.password,
			            screenname: this.state.screenname
			          })
		      if (cuser.status === "success") {

			            const loggedIn = await getLogin({
					            username: this.state.username,
					            password: this.state.password
					          });

			            this.setState({ loggedIn });
			            if (loggedIn.status === "success") {
					          
					            jsCookie.set("screenname", loggedIn.screenname)
					          
					            Router.replace("/secret");
					          }

			          }

		    }

	  render() {
		      const that = this;
		      return (
			            <Layout
			              style={{ margin: "auto auto", width: "600px", textAlign: "center" }}
			            >
			              <h2>Register for an Account</h2>
			              <label htmlFor="username" className="text-style">
			                Username:{" "}
			              </label>
			              <input
			                type="text"
			                id="username"
			                className="input-style"
			                value={this.state.username}
			                onChange={this.handleUsername.bind(this)}
			              />
			              <br /> <br />
			              <label htmlFor="password" className="text-style">
			                Password:{" "}
			              </label>
			              <input
			                type="password"
			                id="password"
			                className="input-style"
			                value={this.state.password}
			                onChange={this.handlePassword.bind(this)}
			              />
			              <br /> <br />
			              <label htmlFor="screenname" className="text-style">
			                Real name:{" "}
			              </label>
			              <input
			                type="text"
			                id="screenname"
			                className="input-style"
			                value={this.state.screenname}
			                onChange={this.handleScreenname.bind(this)}
			              />
			              <br />
			              <br />
			              <div className="button-style" onClick={this.handleCreateUser.bind(this)}>Submit</div>
			              <br /> <br />
			              <style jsx>{`
				                h1,
						          h2,
							            h3,
								              h4,
									                a,
											          p {
												              color: #1f618d;
													                  font-family: "Arial";
															            }

																              .button-style {
																	                  margin: auto auto;
																			              cursor: pointer;
																				                  background-color: #1f618d;
																						              color: #ffffff;
																							                  width: 150px;
																									              height: 45px;
																										                  font-family: "Arial";
																												              line-height: 1.9;
																													                  font-size: 1.4rem;
																															            }

																																              .text-style {
																																	                  font-size: 1.4rem;
																																			              line-height: 1.6rem;
																																				                  font-family: "Arial";
																																						              width: 50px;
																																							                  align: right;
																																									            }

																																										              .input-style {
																																											                  font-size: 1.4rem;
																																													              line-height: 1.6rem;
																																														                }

																																																          .description {
																																																	              font-family: "Arial";
																																																		                  font-size: "10px";
																																																				            }

																																																					              ul {
																																																						                  padding: 0;
																																																								            }

																																																									              li {
																																																										                  list-style: none;
																																																												              margin: 5px 0;
																																																													                }

																																																															          a {
																																																																              text-decoration: none;
																																																																	                  color: blue;
																																																																			            }

																																																																				              input {
																																																																					                  margin: auto auto;
																																																																							              width: 200px;
																																																																								                }

																																																																										          .description {
																																																																											              font-family: "Arial";
																																																																												                  font-size: "10px";
																																																																														            }

																																																																															              ul {
																																																																																                  padding: 0;
																																																																																		            }

																																																																																			              li {
																																																																																				                  list-style: none;
																																																																																						              margin: 5px 0;
																																																																																							                }

																																																																																									          a {
																																																																																										              text-decoration: none;
																																																																																											                  color: blue;
																																																																																													            }

																																																																																														              a:hover {
																																																																																															                  opacity: 0.6;
																																																																																																	            }
																																																																																																		            `}</style>
			            </Layout>
			          );
		    }
}

export default Login;
