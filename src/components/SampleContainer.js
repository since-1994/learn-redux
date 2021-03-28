import React, { useEffect } from "react";
import { connect } from "react-redux";
import { getPost, getUsers } from "../modules/sample";
import Sample from "./Sample";

const SampleContainer = ({
  post,
  users,
  loadingPost,
  loadingUsers,
  getPost,
  getUsers,
}) => {
  useEffect(() => {
    getPost(1);
    getUsers(1);
  }, [getPost, getUsers]);
  return (
    <div>
      <Sample
        loadingPost={loadingPost}
        loadingUsers={loadingUsers}
        post={post}
        users={users}
      />
    </div>
  );
};

const mapStateToProps = ({ sample, loading }) => {
  return {
    post: sample.post,
    users: sample.users,
    loadingPost: loading["sample/GET_POST"],
    loadingUsers: loading["sample/GET_USERS"],
  };
};

const mapDispatchToProps = {
  getPost,
  getUsers,
};

export default connect(mapStateToProps, mapDispatchToProps)(SampleContainer);
