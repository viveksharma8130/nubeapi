export declare class Populate {
    postAllPopulate: ({
        path: string;
        select?: undefined;
        populate?: undefined;
    } | {
        path: string;
        select: string;
        populate?: undefined;
    } | {
        path: string;
        populate: ({
            path: string;
            select: string[];
            populate?: undefined;
        } | {
            path: string;
            populate: ({
                path: string;
                select: string[];
            } | {
                path: string;
                select?: undefined;
            })[];
            select?: undefined;
        } | {
            path: string;
            select?: undefined;
            populate?: undefined;
        })[];
        select?: undefined;
    })[];
    postAllPopulateWithAudio: ({
        path: string;
        populate: {
            path: string;
        };
        select?: undefined;
    } | {
        path: string;
        populate?: undefined;
        select?: undefined;
    } | {
        path: string;
        select: string;
        populate?: undefined;
    } | {
        path: string;
        populate: ({
            path: string;
            select: string[];
            populate?: undefined;
        } | {
            path: string;
            populate: ({
                path: string;
                select: string[];
            } | {
                path: string;
                select?: undefined;
            })[];
            select?: undefined;
        } | {
            path: string;
            select?: undefined;
            populate?: undefined;
        })[];
        select?: undefined;
    })[];
    postAllPopulateWithUserId: ({
        path: string;
        populate: {
            path: string;
        };
        select?: undefined;
    } | {
        path: string;
        populate?: undefined;
        select?: undefined;
    } | {
        path: string;
        select: string;
        populate?: undefined;
    } | {
        path: string;
        populate: ({
            path: string;
            select: string[];
            populate?: undefined;
        } | {
            path: string;
            populate: ({
                path: string;
                select: string[];
            } | {
                path: string;
                select?: undefined;
            })[];
            select?: undefined;
        } | {
            path: string;
            select?: undefined;
            populate?: undefined;
        })[];
        select?: undefined;
    })[];
    userAllPopulate: ({
        path: string;
        select?: undefined;
    } | {
        path: string;
        select: string;
    })[];
    commentAllPopulate: ({
        path: string;
        select: string[];
        populate?: undefined;
    } | {
        path: string;
        select?: undefined;
        populate?: undefined;
    } | {
        path: string;
        populate: ({
            path: string;
            select: string[];
        } | {
            path: string;
            select?: undefined;
        })[];
        select?: undefined;
    })[];
    audioCategoryPopulate: {
        path: string;
        populate: {
            path: string;
        };
    }[];
    audioPopulate: ({
        path: string;
        select?: undefined;
    } | {
        path: string;
        select: string;
    })[];
}
