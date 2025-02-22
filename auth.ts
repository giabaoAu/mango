import NextAuth from "next-auth"
import GitHub from "next-auth/providers/github"
import { AUTHOR_BY_GITHUB_ID_QUERY } from "./sanity/lib/queries"
import { client } from "./sanity/lib/client";
import { writeClient } from "./sanity/lib/write-client";
 
// This is being executed after creating the session
export const { handlers, auth, signIn, signOut } = NextAuth({
  providers: [GitHub],
  callbacks: {
    // profile, user from github oauth
    // Check if we need to create a new author associated with this github account
    async signIn({ user: {name, email, image}, profile }) {
      if(!profile) return false; 

      const { id, login, bio } = profile;
      
      // Disable caching to get session live data
      const exstingUser = await client
        .withConfig({useCdn: false})
        .fetch(AUTHOR_BY_GITHUB_ID_QUERY, { id }
      );

      if(!exstingUser){
        await writeClient.create({
          _type: "author",
          id,
          name,
          username: login,
          email,
          image,
          bio: bio || "",
        })
      }

      // continue after successful sign in
      return true;
    },

    // Connect github acount to author in sanity -> create new project 
    async jwt({ token, account, profile }) {
      if (account && profile) {
        const user = await client
          .withConfig({useCdn: false})
          .fetch(AUTHOR_BY_GITHUB_ID_QUERY, { id: profile.id }
        );
        
        token.id = user?._id;
      }

      return token;
    },

    async session({session, token}) {
      Object.assign(session, {id: token.id});
      return session;
    }
  }
})