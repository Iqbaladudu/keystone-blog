import { statelessSessions } from "@keystone-6/core/session";
import { createAuth } from "@keystone-6/auth";

const { withAuth } = createAuth({
	listKey: "User",
	identityField: "email",
	sessionData: "name",
	secretField: "password",
	initFirstItem: {
		fields: ["name", "email", "password"],
	},
});

let sessionSecret = "-- DEV COOKIE SECRET; CHANGE ME --";
let sessionMaxAge = 60 * 60 * 24 * 30; // 30 days

const session = statelessSessions({
	maxAge: sessionMaxAge,
	secret: sessionSecret,
});

export { withAuth, session };
