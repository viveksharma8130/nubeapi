export class Populate{

    // POST 

    public postAllPopulate = [
        //{ path: "audio_id", populate: { path: "audio_category_id" }},
        {   path: "user_id"},
        {   path: 'interests', select: 'interest' },
        {   path: 'hashtags', select: 'hashtag' },
        {   path: "tags", select: 'lime_id'},
        {   path: 'postLikeCount' },
        {   path: 'postShareCount' },
        {   path: "postComment", 
            populate:[
                {   path: "user_id", select: ['name', 'profile_pic', 'lime_id', 'blue_tick']},
                {   path: "subComment", 
                    populate: [
                        { path: "user_id", select: ['name', 'profile_pic', 'lime_id', 'blue_tick'] },
                        { path: "subCommentLikeCount"},
                    ]
                },
                {   path: "commentLikeCount"},
                {   path: "commentSubCommentCount"},
            ]
        },
        {   path: 'postCommentCount' },
        {   path: 'postViewCount' },
    ];

    public postAllPopulateWithAudio = [
        {   path: "audio_id", populate: { path: "audio_category_id" }},
        {   path: "video_id"},
        {   path: "user_id"},
        {   path: 'interests', select: 'interest' },
        {   path: 'hashtags', select: 'hashtag' },
        {   path: "tags", select: 'lime_id'},
        {   path: 'postLikeCount' },
        {   path: 'postShareCount' },
        {   path: "postComment", 
            populate:[
                {   path: "user_id", select: ['name', 'profile_pic', 'lime_id', 'blue_tick']},
                {   path: "subComment", 
                    populate: [
                        { path: "user_id", select: ['name', 'profile_pic', 'lime_id', 'blue_tick'] },
                        { path: "subCommentLikeCount"},
                    ]
                },
                {   path: "commentLikeCount"},
                {   path: "commentSubCommentCount"},
            ]
        },
        {   path: 'postCommentCount' },
        {   path: 'postViewCount' },
    ];

    public postAllPopulateWithUserId = [
        {   path: "audio_id", populate: { path: "audio_category_id" }},
        {   path: "user_id"},
        {   path: 'interests', select: 'interest' },
        {   path: 'hashtags', select: 'hashtag' },
        {   path: "tags", select: 'lime_id'},
        {   path: 'postLikeCount' },
        {   path: 'postShareCount' },
        {   path: "postComment", 
            populate:[
                {   path: "user_id", select: ['name', 'profile_pic', 'lime_id', 'blue_tick']},
                {   path: "subComment", 
                    populate: [
                        { path: "user_id", select: ['name', 'profile_pic', 'lime_id', 'blue_tick'] },
                        { path: "subCommentLikeCount"},
                    ]
                },
                {   path: "commentLikeCount"},
                {   path: "commentSubCommentCount"},
            ]
        },
        {   path: 'postCommentCount' },
        {   path: 'postViewCount' },
        { path: "user_id", populate: [{ path: "pinned"},{ path: 'userPostCount' },{ path: 'userFollowerCount' },{ path: 'userFollowingCount' }]},
    ];

    // USER

    public userAllPopulate = [
        //  { path: 'userPost', select: 'about video' }, 
        { path: 'pinned' },
        { path: 'interests', select: 'interest' }, 
        { path: 'userPostCount' },
        { path: 'userFollowerCount' },
        { path: 'userFollowingCount' },
        //{ path: 'userPostLikeCount' },
    ];

    // COMMENT

    public commentAllPopulate = [
        { path: 'user_id', select: ['name', 'profile_pic', 'lime_id'] },
        { path: 'post_id' },
        { path: 'subComment', populate: [{ path: 'user_id', select: ['name', 'profile_pic', 'lime_id']},{path:'subCommentLikeCount'}]},
        { path: 'commentLikeCount'},
        { path: 'commentSubCommentCount'},
    ];

    // AUDIO_CATEGORY

    public audioCategoryPopulate = [
        {   path: 'audioDocument', 
            populate: {
                path: "audio_category_id" 
            } 
        }
    ];

    // AUDIO

    public audioPopulate = [
        { path: 'postCount' },
        { path: 'audio_category_id', select: 'category' }
    ];


}