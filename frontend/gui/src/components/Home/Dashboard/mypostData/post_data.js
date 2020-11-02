

const posts = [
    {
        id: 1,
        timestamp: "Sat Oct 10 2020",
        owner: "shoumik",
        description: "my face",
        image: "link",
        num_upvotes: 24,
        num_downvotes: 1,
        num_comments: 4,
        comments: [
            {
                id: 1,
                description: "cool dude",
                owner: "rajat",
                timestamp: "Sat Oct 10 2020",
            },
            {
                id: 2,
                description: "anghar bhai",
                owner: "gurudev",
                timestamp: "Sat Oct 10 2020",
            },
            {
                id: 3,
                description: "ye kya hai ?",
                owner: "priyang",
                timestamp: "Wed Oct 21 2020",
            },
            {
                id: 3,
                description: "ye kya hai ?",
                owner: "priyang",
                timestamp: "Wed Oct 21 2020",
            }
        ],
    },
    {
        id: 2,
        timestamp: "Sun Oct 10 2020",
        owner: "rajat",
        description: "random image",
        image: "link",
        num_upvotes: 29,
        num_downvotes: 4,
        num_comments: 2,
        comments: [
            {
                id: 1,
                description: "amazing",
                owner: "shoumik",
                timestamp: "Sun Oct 10 2020",
            },
            {
                id: 2,
                description: "ye kya hai ?",
                owner: "priyang",
                timestamp: "Mon Oct 10 2020",
            },
        ],
    }
];

const user = {
    username: 'rajat',
}



export { posts, user };