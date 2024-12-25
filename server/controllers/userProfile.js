
import { validationResult } from 'express-validator';
import bcrypt from 'bcryptjs';
import { connectToDatabase, closeConnection } from '../database/mySql.js';
import jwt from "jsonwebtoken";
// import dotenv from "dotenv";
import dotenv from 'dotenv'
import { generatePassword, referCodeGenerator, encrypt } from '../utility/index.js';
import { queryAsync, mailSender, logError, logInfo, logWarning } from '../helper/index.js';

dotenv.config()
const JWT_SECRET = process.env.JWTSECRET;
const SIGNATURE = process.env.SIGNATURE;






export const profileDetail = async (req, res) => {
    let success = false;
    const userId = req.user.id;
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        const warningMessage = "Data is not in the right format";
        logWarning(warningMessage); // Log the warning
        return res.status(400).json({ success, data: errors.array(), message: warningMessage });
    }

    try {

        connectToDatabase(async (err, conn) => {
            if (err) {
                logError(err)
                res.status(500).json({ success: false, data: err, message: "Failed to connect to database" });
                return;
            }

            try {
                let { userPicture, userMobile, userDesignation, userCollege, userAbout } = req.body;
                userPicture = userPicture ?? null
                userMobile = userMobile ?? null
                userDesignation = userDesignation ?? null
                userCollege = userCollege ?? null
                userAbout = userAbout ?? null
                const query = `SELECT Name FROM Community_User WHERE isnull(delStatus,0) = 0 AND EmailId = ?`;
                const rows = await queryAsync(conn, query, [userId]);

                if (rows.length > 0) {

                    try {

                        if (userPicture != null || userMobile != null || userDesignation != null || userCollege != null || userAbout != null) {

                            const updateQuery = `UPDATE Community_User SET MobileNumber = ?, Designation = ?, CollegeName = ?, About = ?, ProfilePicture = ?, AuthLstEdit= ?, editOnDt = GETDATE() WHERE isnull(delStatus,0) = 0 AND EmailId= ?`
                            const update = await queryAsync(conn, updateQuery, [userMobile, userDesignation, userCollege, userAbout, userPicture, rows[0].Name, userId])

                        }
                        const getQuery = `SELECT Name, EmailId, CollegeName, MobileNumber, Designation, About, ProfilePicture FROM Community_User WHERE isnull(delStatus,0) = 0 AND EmailId = ?`
                        const getRows = await queryAsync(conn, getQuery, [userId]);
                        const userData = getRows[0]
                        closeConnection();
                        const warningMessage = 'This link is not valid'
                        logWarning(warningMessage)
                        return res.status(200).json({ success: false, data: { userData }, message: warningMessage })


                    } catch (Err) {
                        closeConnection();
                        logError(Err)
                        res.status(500).json({ success: false, data: Err, message: 'Something went wrong please try again' });
                    }

                } else {
                    closeConnection();
                    const warningMessage = "invalid link"
                    logWarning(warningMessage)
                    res.status(200).json({ success: false, data: {}, message: warningMessage });
                }
            } catch (queryErr) {
                closeConnection();
                logError(queryErr)
                res.status(500).json({ success: false, data: queryErr, message: 'Something went wrong please try again' });
            }

        })
    } catch (Err) {
        closeConnection();
        logError(Err)
        res.status(500).json({ success: false, data: Err, message: 'Something went wrong please try again' });
    }
}


export const getUserDiscussion = async (req, res) => {
    let success = false;
    const userId = req.user.id;
    console.log(userId);
    
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        const warningMessage = "Data is not in the right format";
        logWarning(warningMessage);
        res.status(400).json({ success, data: errors.array(), message: warningMessage });
        return;
    }

    try {
        connectToDatabase(async (err, conn) => {
            if (err) {
                const errorMessage = "Failed to connect to database";
                logError(err);
                res.status(500).json({ success: false, data: err, message: errorMessage });
                return;
            }

            try {

                const query = `SELECT UserID, Name FROM Community_User WHERE isnull(delStatus,0) = 0 AND EmailId = ?`;
                const rows = await queryAsync(conn, query, [userId]);
                const discussionGetQuery = `SELECT DiscussionID, UserID, AuthAdd as UserName, Title, Content, Image, Tag, ResourceUrl, AddOnDt as timestamp FROM Community_Discussion WHERE ISNULL(delStatus, 0) = 0 AND UserID = ? AND Reference = 0 ORDER BY AddOnDt DESC`;
                const discussionGet = await queryAsync(conn, discussionGetQuery, [rows[0].UserID]);
                const updatedDiscussions = [];

                for (const item of discussionGet) {
                    const likeCountQuery = `SELECT DiscussionID, UserID, Likes, AuthAdd as UserName FROM Community_Discussion WHERE ISNULL(delStatus, 0) = 0 AND Likes > 0 AND Reference = ?`;
                    const likeCountResult = await queryAsync(conn, likeCountQuery, [item.DiscussionID]);
                    const commentQuery = `SELECT DiscussionID, UserID, Comment, AuthAdd as UserName, AddOnDt as timestamp FROM Community_Discussion WHERE ISNULL(delStatus, 0) = 0 AND  Comment IS NOT NULL AND Reference = ? ORDER BY AddOnDt DESC`;
                    const commentResult = await queryAsync(conn, commentQuery, [item.DiscussionID]);
                    const commentsArray = Array.isArray(commentResult) ? commentResult : [];
                    const commentsArrayUpdated = [];
                    let userLike = 0;

                    if (likeCountResult.some(likeItem => likeItem.UserID === rows[0].UserID && likeItem.Likes === 1)) {
                        userLike = 1;
                    }

                    if (commentsArray.length > 0) {
                        for (const comment of commentsArray) {
                            const commentsArrayUpdatedSecond = [];

                            const likeCountQuery = `SELECT DiscussionID, UserID, Likes, AuthAdd as UserName FROM Community_Discussion WHERE ISNULL(delStatus, 0) = 0 AND Likes > 0 AND Reference = ?`;
                            const likeCountResult = await queryAsync(conn, likeCountQuery, [comment.DiscussionID]);
                            const likeCount = likeCountResult.length > 0 ? likeCountResult.length : 0;

                            const commentQuery = `SELECT DiscussionID, UserID, Comment, AuthAdd as UserName, AddOnDt as timestamp FROM Community_Discussion WHERE ISNULL(delStatus, 0) = 0 AND  Comment IS NOT NULL AND Reference = ? ORDER BY AddOnDt DESC`;
                            const commentResult = await queryAsync(conn, commentQuery, [comment.DiscussionID]);
                            const secondLevelCommentsArray = Array.isArray(commentResult) ? commentResult : [];

                            let secondLevelUserLike = 0;
                            if (likeCountResult.some(likeItem => likeItem.UserID === rows[0].UserID && likeItem.Likes === 1)) {
                                secondLevelUserLike = 1;
                            }

                            if (secondLevelCommentsArray.length > 0) {
                                for (const secondLevelComment of secondLevelCommentsArray) {
                                    const secondLevelLikeCountQuery = `SELECT DiscussionID, UserID, Likes, AuthAdd as UserName, AddOnDt as timestamp FROM Community_Discussion WHERE ISNULL(delStatus, 0) = 0 AND Likes > 0 AND Reference = ?`;
                                    const secondLevelLikeCountResult = await queryAsync(conn, secondLevelLikeCountQuery, [secondLevelComment.DiscussionID]);
                                    const secondLevelLikeCount = secondLevelLikeCountResult.length > 0 ? secondLevelLikeCountResult.length : 0;

                                    let secondLevelUserLike = 0;
                                    if (secondLevelLikeCountResult.some(likeItem => likeItem.UserID === rows[0].UserID && likeItem.Likes === 1)) {
                                        secondLevelUserLike = 1;
                                    }

                                    commentsArrayUpdatedSecond.push({ ...secondLevelComment, likeCount: secondLevelLikeCount, userLike: secondLevelUserLike });
                                }
                            }

                            commentsArrayUpdated.push({ ...comment, likeCount, userLike: secondLevelUserLike, comment: commentsArrayUpdatedSecond });
                        }
                    }

                    const likeCount = likeCountResult.length > 0 ? likeCountResult.length : 0;
                    updatedDiscussions.push({ ...item, likeCount, userLike, comment: commentsArrayUpdated });
                }

                success = true;
                closeConnection();
                const infoMessage = "Discussion Get Successfully";
                logInfo(infoMessage);
                res.status(200).json({ success, data: { updatedDiscussions }, message: infoMessage });
            }
            catch (queryErr) {
                logError(queryErr);
                closeConnection();
                res.status(500).json({ success: false, data: queryErr, message: 'Something went wrong please try again' });
            }
        });
    } catch (error) {
        logError(error);
        res.status(500).json({ success: false, data: {}, message: 'Something went wrong please try again' });
    }
};

export const deleteUserDiscussion = async (req, res) => {
    let success = false;
    const userId = req.user.id;
    const { discussionId } = req.body; // Get discussionId from request body

    // Validate the discussionId
    if (!discussionId) {
        const warningMessage = "Discussion ID is required";
        logWarning(warningMessage);
        return res.status(400).json({ success, message: warningMessage });
    }

    try {
        // Connect to the database
        connectToDatabase(async (err, conn) => {
            if (err) {
                const errorMessage = "Failed to connect to database";
                logError(err);
                return res.status(500).json({ success: false, message: errorMessage });
            }

            try {
                // Check if the discussion exists and if the user is the owner
                const checkQuery = `SELECT UserID FROM Community_Discussion WHERE DiscussionID = ? AND ISNULL(delStatus, 0) = 0`;
                const discussion = await queryAsync(conn, checkQuery, [discussionId]);

                if (discussion.length === 0) {
                    const errorMessage = "Discussion not found or already deleted";
                    logWarning(errorMessage);
                    return res.status(404).json({ success, message: errorMessage });
                }

                if (discussion[0].UserID !== userId) {
                    const errorMessage = "You are not authorized to delete this discussion";
                    logWarning(errorMessage);
                    return res.status(403).json({ success, message: errorMessage });
                }

                // Proceed to delete the discussion by setting delStatus to 1 (soft delete)
                const deleteQuery = `UPDATE Community_Discussion SET delStatus = 1 WHERE DiscussionID = ?`;
                await queryAsync(conn, deleteQuery, [discussionId]);

                success = true;
                const infoMessage = "Discussion deleted successfully";
                logInfo(infoMessage);
                res.status(200).json({ success, message: infoMessage });
            } catch (queryErr) {
                logError(queryErr);
                res.status(500).json({ success: false, message: 'Something went wrong, please try again' });
            } finally {
                closeConnection();  // Always close the database connection
            }
        });
    } catch (error) {
        logError(error);
        res.status(500).json({ success: false, message: 'Something went wrong, please try again' });
    }
};

