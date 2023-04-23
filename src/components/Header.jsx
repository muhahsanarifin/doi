import React, { useEffect } from "react";
import Image from "next/image";
import usersAction from "../redux/actions/user";
import { useDispatch, useSelector } from "react-redux";
import { getCookie } from "cookies-next";
import bellIcon from "../assets/icons/bell.png";
import { Icon } from "@iconify/react";
import { color } from "@chakra-ui/react";

const Header = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.users);

  useEffect(() => {
    dispatch(usersAction.getDataUserThunk(getCookie("id"), getCookie("token")));
  }, [dispatch]);

  return (
    <>
      <header className={"header-section"}>
        <span className={"header"}>
          <span className={"logo"}>Doi</span>
          <span className={"header__profile"}>
            {user.getDataUser.data?.image ? (
              <Image
                src={`${process.env.NEXT_PUBLIC_DOI_CLOUDINARY}/${user.getDataUser.data?.image}`}
                alt="Profile"
                // className={"image-profile"}
                width={50}
                height={50}
                style={{
                  borderRadius: "6px",
                  width: "32px",
                  height: "32px",
                  objectFit: "fill",
                }}
              />
            ) : (
              <Icon
                icon="radix-icons:avatar"
                style={{ width: "32px", height: "32px" }}
              />
            )}
            <span className={"indentity-short"}>
              <p className={"fullname"}>
                {`${user.getDataUser.data?.firstName} ${user.getDataUser.data?.lastName}`}
              </p>
              <p className={"phonenumber"}>
                {user.getDataUser.data?.noTelp === null ? (
                  <span
                    style={{
                      fontWeight: 700,
                      color: "#ff8c90",
                    }}
                  >
                    Please, set your phone number!
                  </span>
                ) : (
                  `${user.getDataUser.data?.noTelp}`
                )}
              </p>
            </span>
            <span className={"bell"}>
              <span className={"notification"}></span>
              <Image src={bellIcon} alt="Bell" />
            </span>
          </span>
        </span>
      </header>
      {/* Functional same as css internal */}
      <style jsx>{`

        .header-section {            
          background: #E5E5E5;
        }
        
        .header{
          display: flex;
          flex-direction: row;
          align-items: center;
          justify-content: space-between;
          box-shadow: 0px 4px 20px rgba(0, 0, 0, 0.05);
          border-bottom-left-radius: 16px;
          border-bottom-right-radius: 16px;
          padding: 2rem 8rem;
          background: #FFFFFF
        }

        .fullname {
          font-size: 14px;
          font-weight: 800;
          color: #3a3d42;
        }
        .phonenumber {
          font-size: 10px;
        }

        .logo {
          /* border: 1px solid darkblue; */
          font-size: 18px;
          font-weight: 800;
          color: #6379f4;
        }
        .header__profile {
          /* border: 1px solid darkblue; */
          display: flex;
          flex-direction: row;
          align-items: center;
          gap: 1rem;
          justify-content: center;
        }

        /*.image-profile {
          /* border: 1px solid darkgoldenrod; */
          width: 32px;
          height: 32px;
          border-radius: 6px;
          object-fit: fill;
        }*/

        .identity-short {
          /* border: 1px solid darkblue; */
          display: flex;
          flex-direction: column;
          gap: 0.5rem;
        }

        .bell {
          /* border: 1px solid darkblue; */
          width: 14px;
          height: 14px;
          cursor: pointer;
        }

        .notification {
          /* border: 2px solid darkblue; */
          width: 14px;
          height: 14px;
          border-radius: 100%;
          display: none;
        }

        .bell img {
          /* border: 1px solid darkblue; */
          width: 16px;
          height: 16px;
        }

        @media all and (min-width: 768px) and (max-width: 1024px) {
          .header {
            padding: 1rem;
          }
        }

        @media all and (min-width: 480px) and (max-width: 768px) {
        }

        @media all and (max-width: 480px) {
          .header {
            padding: 1rem;
          }
        }
      `}</style>
    </>
  );
};

export default Header;
