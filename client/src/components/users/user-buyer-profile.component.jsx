import React from "react";

const UserBuyerProfileComponent = () => {

    return (

        <div className="tab-pane fade" id="buyer-profile" role="tabpanel" aria-labelledby="buyer-profile-tab">
            <div className="mb-4">
                <div className="card mb-4">
                    <div className="card-body">
                        <h6 className="card-title mb-4">Buyer Information</h6>
                        <div className="row">
                            <div className="col-md-6">
                                <div className="mb-3">
                                    <label className="form-label">Name</label>
                                    <input type="text" className="form-control" value="Adek Kembar" />
                                </div>
                                <div className="mb-3">
                                    <label className="form-label">Username</label>
                                    <input type="text" className="form-control" value="adek-kembar" />
                                </div>
                                <div className="mb-3">
                                    <label className="form-label">Email</label>
                                    <input type="text" className="form-control"
                                           value="wtaffe3@addthis.com" />
                                </div>
                                <div className="mb-3">
                                    <label className="form-label">Date of Birth</label>
                                    <div className="d-flex gap-3">
                                        <select className="form-select">
                                            <option>Day</option>
                                            <option>1</option>
                                            <option>2</option>
                                            <option>3</option>
                                            <option>4</option>
                                            <option>5</option>
                                            <option>6</option>
                                            <option>7</option>
                                            <option>8</option>
                                            <option>9</option>
                                            <option>10</option>
                                            <option>11</option>
                                            <option>12</option>
                                            <option>13</option>
                                            <option>14</option>
                                            <option>15</option>
                                            <option>16</option>
                                            <option>17</option>
                                            <option>18</option>
                                            <option>19</option>
                                            <option selected="">20</option>
                                            <option>21</option>
                                            <option>22</option>
                                            <option>23</option>
                                            <option>24</option>
                                            <option>25</option>
                                            <option>26</option>
                                            <option>27</option>
                                            <option>28</option>
                                            <option>29</option>
                                            <option>30</option>
                                        </select>
                                        <select className="form-select">
                                            <option>Month</option>
                                            <option selected="">Jan</option>
                                            <option>Feb</option>
                                            <option>Mar</option>
                                            <option>Apr</option>
                                            <option>May</option>
                                            <option>Jun</option>
                                            <option>Jul</option>
                                            <option>Aug</option>
                                            <option>Sep</option>
                                            <option>Oct</option>
                                            <option>Nov</option>
                                            <option>Dec</option>
                                        </select>
                                        <select className="form-select">
                                            <option>Year</option>
                                            <option>2018</option>
                                            <option>2017</option>
                                            <option>2016</option>
                                            <option>2015</option>
                                            <option>2014</option>
                                            <option>2013</option>
                                            <option>2012</option>
                                            <option>2011</option>
                                            <option>2010</option>
                                            <option>2009</option>
                                            <option>2008</option>
                                            <option>2007</option>
                                            <option>2006</option>
                                            <option>2005</option>
                                            <option>2004</option>
                                            <option>2003</option>
                                            <option>2002</option>
                                            <option>2001</option>
                                            <option>2000</option>
                                            <option>1999</option>
                                            <option>1998</option>
                                            <option>1997</option>
                                            <option>1996</option>
                                            <option>1995</option>
                                            <option>1994</option>
                                            <option>1993</option>
                                            <option>1992</option>
                                            <option>1991</option>
                                            <option>1990</option>
                                            <option selected="">1989</option>
                                            <option>1988</option>
                                            <option>1987</option>
                                            <option>1986</option>
                                            <option>1985</option>
                                            <option>1984</option>
                                            <option>1983</option>
                                            <option>1982</option>
                                            <option>1981</option>
                                            <option>1980</option>
                                        </select>
                                    </div>
                                </div>
                                <div className="mb-3">
                                    <label className="form-label">Gender</label>
                                    <div>
                                        <div className="form-check form-check-inline">
                                            <input type="radio" id="inlineRadio1" name="inlineRadio"
                                                   className="form-check-input" />
                                            <label className="form-check-label"
                                                   htmlFor="inlineRadio1">Male</label>
                                        </div>
                                        <div className="form-check form-check-inline">
                                            <input type="radio" id="inlineRadio2" name="inlineRadio"
                                                   className="form-check-input" />
                                            <label className="form-check-label"
                                                   htmlFor="inlineRadio2">Female</label>
                                        </div>
                                        <div className="form-check form-check-inline">
                                            <input type="radio" id="inlineRadio3" name="inlineRadio"
                                                   className="form-check-input" />
                                            <label className="form-check-label"
                                                   htmlFor="inlineRadio3">Other</label>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="col-md-6">
                                <div className="mb-3">
                                    <label className="form-label">Role</label>
                                    <select className="form-select">
                                        <option value="">All</option>
                                        <option value="">Admin</option>
                                        <option value="">User</option>
                                        <option value="" selected>Staff</option>
                                    </select>
                                </div>
                                <div className="mb-3">
                                    <label className="form-label">Status</label>
                                    <select className="form-select">
                                        <option value="">All</option>
                                        <option value="" selected>Active</option>
                                        <option value="">Blocked</option>
                                    </select>
                                </div>
                                <div className="mb-3">
                                    <label className="form-label">Department</label>
                                    <select className="form-select">
                                        <option value="">All</option>
                                        <option value="">Sales</option>
                                        <option value="" selected>Development</option>
                                        <option value="">Management</option>
                                    </select>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>


            <div className="card mb-4">
                <div className="card-body">
                    <h6 className="card-title mb-4">Contact</h6>
                    <div className="row">
                        <div className="col-md-6">
                            <div className="mb-3">
                                <label className="form-label">Phone</label>
                                <input type="text" className="form-control" value="+65195892151" />
                            </div>
                            <div className="mb-3">
                                <label className="form-label">Website</label>
                                <input type="text" className="form-control"
                                       value="http://laborasyon.com/" />
                            </div>
                            <div className="mb-3">
                                <label className="form-label">Languages</label>
                                <input type="text" className="form-control"
                                       value="http://laborasyon.com/" />
                            </div>
                            <div className="mb-3">
                                <label className="form-label">Address Line 1</label>
                                <input type="text" className="form-control"
                                       value="A-65, Belvedere Streets" />
                            </div>
                            <div className="mb-3">
                                <label className="form-label">Address Line 2</label>
                                <input type="text" className="form-control" value="" />
                            </div>
                        </div>
                        <div className="col-md-6">
                            <div className="mb-3">
                                <label className="form-label">Post Code</label>
                                <input type="text" className="form-control" value="1868" />
                            </div>
                            <div className="mb-3">
                                <label className="form-label">City</label>
                                <input type="text" className="form-control" value="New York" />
                            </div>
                            <div className="mb-3">
                                <label className="form-label">State</label>
                                <input type="text" className="form-control" value="New York" />
                            </div>
                            <div className="mb-3">
                                <label className="form-label">Country</label>
                                <input type="text" className="form-control" value="United States" />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="card">
                <div className="card-body">
                    <h6 className="card-title mb-4">Social</h6>
                    <form>
                        <div className="row">
                            <div className="col-md-6">
                                <div className="mb-3">
                                    <label className="form-label">Twitter</label>
                                    <input type="text" className="form-control"
                                           value="https://twitter.com/roxana-roussell" />
                                </div>
                                <div className="mb-3">
                                    <label className="form-label">Facebook</label>
                                    <input type="text" className="form-control"
                                           value="https://www.facebook.com/roxana-roussell"/>
                                </div>
                            </div>
                            <div className="col-md-6">
                                <div className="mb-3">
                                    <label className="form-label">Instagram</label>
                                    <input type="text" className="form-control"
                                           value="https://www.instagram.com/roxana-roussell/" />
                                </div>
                                <div className="mb-3">
                                    <label className="form-label">GitHub</label>
                                    <input type="text" className="form-control"
                                           value="https://github.com/roxana-roussell" />
                                </div>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default UserBuyerProfileComponent;