import { useContext, useState } from "react";
import MovieContext from "../context/MovieContext";
import styled from "styled-components";
import { Navigate, useNavigate } from "react-router-dom";
import { useForm, SubmitHandler } from "react-hook-form";

interface Inputs {
  old_password: string;
  new_password: string;
}

function Personal() {
  const [errorMsg, setErrorMsg] = useState<string>("");
  let { user, personalInfo, authTokens, getUserInfo, logoutUser } =
    useContext(MovieContext);
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
  } = useForm<Inputs>();

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    let response = await fetch(`http://127.0.0.1:8000/api/change_password`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + authTokens?.access,
      },
      credentials: "include",
      body: JSON.stringify(data),
    });

    if (response.status == 204) {
      console.log("Password updated");
      logoutUser();
      reset();
      navigate("/login");
    } else {
      setErrorMsg("Something went wrong; Check your data!");
    }
  };

  let changeAvatar = async (
    e: React.FormEvent<HTMLFormElement>,
    tkn: string,
    url: string
  ) => {
    if (e.target) {
      const formData = new FormData(e.currentTarget);

      let response = await fetch(url, {
        method: "PUT",
        headers: {
          Authorization: "Bearer " + tkn,
        },
        credentials: "include",
        body: formData,
      });

      if (response.status == 200 && authTokens) {
        getUserInfo(authTokens?.access);
      }
    }
  };

  return (
    <Container>
      <InfoBox>Personal Info</InfoBox>
      {!user && <Navigate to="/" />}
      <Name>Name: {personalInfo?.username}</Name>

      <AvatarBox>
        <Avatar>Avatar:</Avatar>
        <AvatarForm
          onChange={(e) => {
            if (authTokens)
              changeAvatar(
                e,
                authTokens?.access,
                `http://127.0.0.1:8000/api/update_avatar/${personalInfo?.id}`
              );
          }}
        >
          <AvatarInput type="file" name="avatar" accept="image/*" />
        </AvatarForm>
      </AvatarBox>

      <PasswordBox>
        <PasswordTitle>Password</PasswordTitle>
        <PasswordForm onSubmit={handleSubmit(onSubmit)}>
          <PasswordInput
            onClick={() => setErrorMsg("")}
            type="text"
            {...register("old_password")}
          />
          <PasswordInput
            type="text"
            onClick={() => setErrorMsg("")}
            {...register("new_password")}
          />
          {errorMsg && <ErrorMsg>{errorMsg}</ErrorMsg>}
          <Submit type="submit" value={"change"} />
        </PasswordForm>
      </PasswordBox>
    </Container>
  );
}

export default Personal;

const Container = styled.div``;
const InfoBox = styled.h2`
  margin-bottom: 50px;
`;
const AvatarBox = styled.div`
  display: flex;
  align-items: center;
  gap: 20px;
`;
const Avatar = styled.p``;
const Name = styled.p`
  margin-right: 20px;
  margin-bottom: 20px;
`;
const AvatarForm = styled.form``;
const AvatarInput = styled.input``;

const PasswordBox = styled.section`
  margin-top: 100px;
`;
const PasswordTitle = styled.h2`
  margin-top: 100px;
  margin-bottom: 50px;
`;
const PasswordForm = styled.form`
  max-width: 170px;
  display: flex;
  flex-direction: column;
  gap: 20px;
`;
const PasswordInput = styled.input`
  font-size: 18px;
  outline-color: grey;
  padding-inline: 5px;
`;
const Submit = styled.input`
  width: 100px;
`;
const ErrorMsg = styled.span`
  color: red;
  font-size: 14px;
  font-weight: 400;
`;
