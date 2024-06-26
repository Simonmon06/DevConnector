//bring in the actual profile data

import React,{Fragment,useEffect} from "react";
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import Spinner from "../components/layout/Spinner";
import {getProfilesById} from "../actions/profileActions";
import {Link} from "react-router-dom";
import ProfileTop from "./ProfileTop";
import ProfileAbout from "./ProfileAbout";
import ProfileExperience from "./ProfileExperience";
import ProfileEducation from "./ProfileEducation";
import ProfileGithub from "./ProfileGithub";

const Profile =({match,getProfilesById,auth,profile:{profile, loading}})=>{
    useEffect(()=>{
        getProfilesById(match.params.id)
    },[getProfilesById, match.params.id])
    return(
        <Fragment>
            {profile === null || loading ? <Spinner/> :
                <Fragment>
                    <Link to='/profiles' className='btn btn-light'>
                    profile
                    </Link>
                    {auth.isAuthenticated && auth.loading === false && auth.user._id === profile.user._id &&
                    (<Link to='/edit-profile' className='btn btn-dark'>
                        Edit profile
                    </Link>
                    )}
                    <div className="profile-grid my-1">
                        <ProfileTop profile={profile}/>
                        <ProfileAbout profile={profile}/>
                        <div className="profile-exp bg-white p-2">
                            {profile.experience.length > 0? (
                                <Fragment>
                                    {profile.experience.map(experience => (
                                        <ProfileExperience key={experience._id} experience={experience}/>
                                    ))}
                                </Fragment>
                            ): (<h4>No experience credentials</h4>)}
                        </div>

                        <div className="profile-edu bg-white p-2">
                            {profile.education.length > 0? (
                                <Fragment>
                                    {profile.education.map(education => (
                                        <ProfileEducation key={education._id} education={education}/>
                                    ))}
                                </Fragment>
                            ): (<h4>No education credentials</h4>)}
                        </div>
                        {profile.githubusername && (
                            <ProfileGithub username={profile.githubusername}/>
                        )

                        }
                    </div>
                </Fragment>}
        </Fragment>
    )

}
Profile.propTypes = {
    getProfilesById: PropTypes.func.isRequired
}
const mapStateToProps = state =>({
    profile: state.profile,
    auth:state.auth
})

export default connect(mapStateToProps,{getProfilesById})(Profile);


