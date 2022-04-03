import { config, list } from "@keystone-6/core";
import {
	password,
	relationship,
	select,
	text,
	timestamp,
} from "@keystone-6/core/fields";
import { document } from "@keystone-6/fields-document";
import { withAuth, session } from "./auth";

const lists = {
	User: list({
		fields: {
			name: text({ validation: { isRequired: true } }),
			email: text({ validation: { isRequired: true }, isIndexed: "unique" }),
			password: password({ validation: { isRequired: true } }),
			posts: relationship({ ref: "Post.author", many: true }),
		},
	}),
	Post: list({
		fields: {
			title: text(),
			publishedAt: timestamp(),
			content: document({
				formatting: true,
				links: true,
				dividers: true,
				layouts: [
					[1, 1],
					[1, 1, 1],
					[2, 1],
					[1, 2],
					[1, 2, 1],
				],
			}),
			author: relationship({
				ref: "User.posts",
			}),
			status: select({
				options: [
					{
						label: "Published",
						value: "published",
					},
					{
						label: "Draft",
						value: "draft",
					},
				],
				defaultValue: "draft",
				ui: {
					displayMode: "segmented-control",
				},
			}),
		},
	}),
};

export default config(
	withAuth({
		db: {
			provider: "sqlite",
			url: "file:./keystone.db",
		},
		lists,
		session,
		ui: {
			isAccessAllowed: (context) => !!context.session?.data,
		},
	})
);
