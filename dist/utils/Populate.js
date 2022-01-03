"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Populate = void 0;
class Populate {
    constructor() {
        // POST 
        this.postAllPopulate = [
            //{ path: "audio_id", populate: { path: "audio_category_id" }},
            { path: "user_id" },
            { path: 'interests', select: 'interest' },
            { path: 'hashtags', select: 'hashtag' },
            { path: "tags", select: 'lime_id' },
            { path: 'postLikeCount' },
            { path: 'postShareCount' },
            { path: "postComment",
                populate: [
                    { path: "user_id", select: ['name', 'profile_pic', 'lime_id', 'blue_tick'] },
                    { path: "subComment",
                        populate: [
                            { path: "user_id", select: ['name', 'profile_pic', 'lime_id', 'blue_tick'] },
                            { path: "subCommentLikeCount" },
                        ]
                    },
                    { path: "commentLikeCount" },
                    { path: "commentSubCommentCount" },
                ]
            },
            { path: 'postCommentCount' },
            { path: 'postViewCount' },
        ];
        this.postAllPopulateWithAudio = [
            { path: "audio_id", populate: { path: "audio_category_id" } },
            { path: "video_id" },
            { path: "user_id" },
            { path: 'interests', select: 'interest' },
            { path: 'hashtags', select: 'hashtag' },
            { path: "tags", select: 'lime_id' },
            { path: 'postLikeCount' },
            { path: 'postShareCount' },
            { path: "postComment",
                populate: [
                    { path: "user_id", select: ['name', 'profile_pic', 'lime_id', 'blue_tick'] },
                    { path: "subComment",
                        populate: [
                            { path: "user_id", select: ['name', 'profile_pic', 'lime_id', 'blue_tick'] },
                            { path: "subCommentLikeCount" },
                        ]
                    },
                    { path: "commentLikeCount" },
                    { path: "commentSubCommentCount" },
                ]
            },
            { path: 'postCommentCount' },
            { path: 'postViewCount' },
        ];
        this.postAllPopulateWithUserId = [
            { path: "audio_id", populate: { path: "audio_category_id" } },
            { path: "user_id" },
            { path: 'interests', select: 'interest' },
            { path: 'hashtags', select: 'hashtag' },
            { path: "tags", select: 'lime_id' },
            { path: 'postLikeCount' },
            { path: 'postShareCount' },
            { path: "postComment",
                populate: [
                    { path: "user_id", select: ['name', 'profile_pic', 'lime_id', 'blue_tick'] },
                    { path: "subComment",
                        populate: [
                            { path: "user_id", select: ['name', 'profile_pic', 'lime_id', 'blue_tick'] },
                            { path: "subCommentLikeCount" },
                        ]
                    },
                    { path: "commentLikeCount" },
                    { path: "commentSubCommentCount" },
                ]
            },
            { path: 'postCommentCount' },
            { path: 'postViewCount' },
            { path: "user_id", populate: [{ path: "pinned" }, { path: 'userPostCount' }, { path: 'userFollowerCount' }, { path: 'userFollowingCount' }] },
        ];
        // USER
        this.userAllPopulate = [
            //  { path: 'userPost', select: 'about video' }, 
            { path: 'pinned' },
            { path: 'interests', select: 'interest' },
            { path: 'userPostCount' },
            { path: 'userFollowerCount' },
            { path: 'userFollowingCount' },
            //{ path: 'userPostLikeCount' },
        ];
        // COMMENT
        this.commentAllPopulate = [
            { path: 'user_id', select: ['name', 'profile_pic', 'lime_id'] },
            { path: 'post_id' },
            { path: 'subComment', populate: [{ path: 'user_id', select: ['name', 'profile_pic', 'lime_id'] }, { path: 'subCommentLikeCount' }] },
            { path: 'commentLikeCount' },
            { path: 'commentSubCommentCount' },
        ];
        // AUDIO_CATEGORY
        this.audioCategoryPopulate = [
            { path: 'audioDocument',
                populate: {
                    path: "audio_category_id"
                }
            }
        ];
        // AUDIO
        this.audioPopulate = [
            { path: 'postCount' },
            { path: 'audio_category_id', select: 'category' }
        ];
    }
}
exports.Populate = Populate;
