export const config = {
    local: {
        baseUrl: "http://localhost:8000/api/v1/",
    },
    staging: {
        baseUrl: "http://core-api-staging-10939710.us-east-1.elb.amazonaws.com/api/v1/",
    },
    production: {
        baseUrl: "https://api.hypertrack.com/api/v1/",
    },
};
