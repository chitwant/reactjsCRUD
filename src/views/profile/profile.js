import React, { useState } from "react";
import { Table } from "reactstrap";
import { useSelector, useDispatch } from "react-redux";
import ModalPopup from "../../components/controls/modal";
import {
  getallusers,
  apiupdateuser,
  apidel,
} from "../../services/http/apiUtils";
import * as actions from "../../utils/action";
import ReactLoading from "react-loading";
import NavigationBar from "../../components/navbar/navbar";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Pagination, PaginationItem, PaginationLink } from "reactstrap";
import { faUserEdit, faTrash, faUser } from "@fortawesome/free-solid-svg-icons";
import { Input, Label, FormGroup, Col } from "reactstrap";
import { toast } from "react-toastify";
import { useEffect } from "react";
const Profile = (props) => {
  const data = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const [show, setShow] = useState(false);
  const [loader, setLoader] = useState(false);
  const [userList, setUserList] = useState([]);
  const [edituser, setEditUser] = useState();
  const [deluser, setDeluser] = useState();
  const [newuserdetail, setNewuserdetail] = useState({
    id: null,
    firstname: "",
    lastname: "",
    email: edituser,
    password: "",
    profileImage: "",
  });
  const [pagesize, sePageSize] = useState(10);
  const [currentpage, setCurretpage] = useState(1);
  const [totalcount, setTotalCount] = useState();
  const [pages, setPages] = useState();
  const pagenumber = [];
  for (let i = 1; i <= pages; i++) {
    pagenumber.push(i);
  }
  console.log(userList);
  const modal = (id) => {
    const user = userList.filter((item) => {
      return item === id;
    });
    setEditUser(user);
    setNewuserdetail(...user, newuserdetail);
    setDeluser("");
    setShow(true);
  };
  console.log("xyz>>>>>>>>>>>>>>>>>>>>>>>", newuserdetail);
  const getdeleteuser = (id) => {
    console.log(id.id);
    const del = userList.filter((item) => {
      return item === id;
    });
    setDeluser(del);
    setEditUser("");
    setShow(true);
  };
  const changepage = (pagesize, currentpage) => {
    setCurretpage(currentpage);
    sePageSize(pagesize);
  };
  useEffect(() => {
    setLoader(true);

    if (data.token !== null) {
      getallusers(
        process.env.REACT_APP_API_URL +
          `User/get-all-user?pagesize=${pagesize}&pagenum=${currentpage}&orderBy=${"id"}`,
        ""
      ).then((response) => {
        console.log(response);
        setLoader(false);
        setUserList(response.data.result.userList);
        setTotalCount(response.data.result.totalCount);
        setPages(Math.ceil(response.data.result.totalCount / pagesize));
      });
    }
  }, [show, pagesize, currentpage]);
  const loaderfunc = () => {
    return (
      <ReactLoading
        type={"spin"}
        color={"#5433ff"}
        height={"4%"}
        width={"70%"}
      />
    );
  };
  const handlelogout = () => {
    dispatch({
      type: actions.LOGOUT,
      payload: {},
    });
    localStorage.removeItem("_token");
  };

  const updateinfo = (e) => {
    const tempuserdetails = { ...newuserdetail };
    tempuserdetails[e.target.name] = e.target.value;
    setNewuserdetail(tempuserdetails);
  };
  const updateuser = async () => {
    console.log(newuserdetail);
    const response = await apiupdateuser(
      process.env.REACT_APP_API_URL + "User/update",
      "",
      newuserdetail
    );
    setShow(false);
  };

  const deleteuser = async (value) => {
    console.log(deluser[0].id);
    // const tempuserid=del[0].id
    const response = await apidel(
      process.env.REACT_APP_API_URL + `User/delete-user?id=${deluser[0].id}`,
      "",
      ""
    );
    if (response.status === 200) {
      toast.success("User Deleted");
    }
    setShow(false);
  };
  return (
    <>
      <NavigationBar logout={handlelogout} />
      <h1>Profile Page</h1>
      {/* <Button onClick={showusers}>Show User List</Button> */}

      <Table bordered>
        {loader && (
          <div id="loaderSection" className="display-section-component">
            {loaderfunc()}
          </div>
        )}

        <thead>
          <tr>
            <th>ID</th>
            <th>Avatar</th>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Username</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {userList.map((users, index) => (
            <tr key={index}>
              <td>{index + 1}</td>
              <td>
                {users.profileImage ? (
                  <img
                    src={users.profileImage}
                    style={{
                      height: "50px",
                      borderRadius: "50%",
                      width: "50px",
                    }}
                  />
                ) : (
                  <FontAwesomeIcon
                    icon={faUser}
                    style={{
                      height: "30px",
                      borderRadius: "50%",
                      width: "30px",
                    }}
                  />
                )}
              </td>
              <td>{users.firstname}</td>
              <td>{users.lastname}</td>
              <td> {users.userName}</td>
              <td>
                <FontAwesomeIcon
                  icon={faUserEdit}
                  onClick={() => modal(users)}
                  style={{ cursor: "pointer" }}
                  className="me-2"
                />

                <FontAwesomeIcon
                  icon={faTrash}
                  onClick={() => getdeleteuser(users)}
                  style={{ cursor: "pointer" }}
                />
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
      <div>
        <Pagination aria-label="Page navigation example">
          <PaginationItem>
            <PaginationLink
              previous
              onClick={() => changepage(pagesize, currentpage - 1)}
            />
          </PaginationItem>

          {pagenumber.map((item) => (
            <>
              <PaginationLink onClick={() => changepage(pagesize, item)}>
                {item}
              </PaginationLink>
            </>
          ))}

          <PaginationItem>
            <PaginationLink
              next
              onClick={() => changepage(pagesize, currentpage + 1)}
            />
          </PaginationItem>
        </Pagination>
      </div>
      {edituser ? (
        <ModalPopup
          show={show}
          onHide={() => setShow(!show)}
          
          // userdata={edituser}
          title="Edit User"
          body={
            <>
              {" "}
              <FormGroup row>
                <Label for="exampleEmail" sm={3}>
                  ID
                </Label>
                <Col sm={9}>
                  <Input
                    name="firstname"
                    placeholder="firstname"
                    type="text"
                    defaultValue={edituser[0].id}
                    disabled={true}
                    onChange={(e) => updateinfo(e)}
                  />
                </Col>
              </FormGroup>
              <FormGroup row>
                <Label for="exampleEmail" sm={3}>
                  First Name
                </Label>
                <Col sm={9}>
                  <Input
                    name="firstname"
                    placeholder="firstname"
                    type="text"
                    defaultValue={edituser[0].firstname}
                    onChange={(e) => updateinfo(e)}
                  />
                </Col>
              </FormGroup>
              <FormGroup row>
                <Label for="exampleEmail" sm={3}>
                  Last Name
                </Label>
                <Col sm={9}>
                  <Input
                    name="lastname"
                    placeholder="lastname"
                    type="text"
                    defaultValue={edituser[0].lastname}
                    onChange={(e) => updateinfo(e)}
                  />
                </Col>
              </FormGroup>
              <FormGroup row>
                <Label for="exampleEmail" sm={3}>
                  E-mail
                </Label>
                <Col sm={9}>
                  <Input
                    name="email"
                    placeholder="email"
                    type="text"
                    defaultValue={edituser[0].email}
                    onChange={(e) => updateinfo(e)}
                  />
                </Col>
              </FormGroup>
            </>
          }
          footer={
            <>
              <button
                type="button"
                className="btn btn-secondary"
                onClick={() => setShow(false)}
              >
                Cancel
              </button>
              <button
                type="button"
                className="btn btn-primary"
                onClick={updateuser}
              >
                Confirm
              </button>
            </>
          }
        />
      ) : (
        <ModalPopup
          show={show}
          onHide={() => setShow(!show)}
          title="Delete User"
          body="Are you sure you want to delete ?"
          footer={
            <>
              <button
                type="button"
                className="btn btn-secondary"
                onClick={() => setShow(false)}
              >
                Cancel
              </button>
              <button
                type="button"
                className="btn btn-primary"
                onClick={async (deluser) => deleteuser(deluser)}
              >
                Confirm
              </button>
            </>
          }
        />
      )}
    </>
  );
};

export default Profile;
