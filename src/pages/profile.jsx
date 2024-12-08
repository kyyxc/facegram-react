import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getFollowers, getFollowing, GetUserProfile } from "../api/user";

import { LayoutPage } from "../components/Layout/LayoutPage";
import { ProfilePost } from "../components/Fragments/ProfilePost";
import {ProfileSection} from "../components/Fragments/ProfileSection"


export const ProfilePage = () => {
  const profile = JSON.parse(localStorage.getItem("user"));
  const { username } = useParams();
  const [user, setUser] = useState();
  const [followers, setFollowers] = useState();
  const [following, setFollowing] = useState();
  const navigate = useNavigate();
  const [status, setStatus] = useState();
  const [isMyAccount, setIsMyAccount] = useState(false);
  const [followersCount, setFollowersCount] = useState();

  useEffect(() => {
    if (username) {
      GetUserProfile(username, setUser);
      getFollowers(username, setFollowers);
      getFollowing(username, setFollowing);
    }
  }, [username]);

  useEffect(() => {
    if (user) {
      setStatus(user.following_status);
      setIsMyAccount(user.is_your_account);
      setFollowersCount(user.followers_count);
    }
  }, [user]);

  useEffect(() => {
    if (!profile) {
      navigate("/login");
    }
  }, [profile, navigate]);
  return (
    <LayoutPage user={profile}>
      {user && (
        <main className="mt-5">
          <div className="container py-5">
            {user  && followers && following && (
                <ProfileSection
                  user={user}
                  followers={followers}
                  following={following}
                  username={username}
                  status={status}
                  isMyAccount={isMyAccount}
                  setStatus={setStatus}
                  followersCount={followersCount}
                  setFollowersCount={setFollowersCount}
                ></ProfileSection>
  
            )}

              <ProfilePost user={user} isMyAccount={isMyAccount}></ProfilePost>

          </div>
        </main>
      )}
    </LayoutPage>
  );
};
