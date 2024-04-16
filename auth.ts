import NextAuth, { NextAuthConfig } from "next-auth";
import github from "next-auth/providers/github"

export const config: NextAuthConfig = {
    providers: [github({
        clientId: process.env.AUTRH_GITHUB_ID,
        clientSecret: process.env.AUTH_GITHUB_SECRET
    })],
    // apiのパス、ルーティング
    basePath: "/api/auth",
    // 認証が完了した後に行う操作のカスタマイズ
    callbacks: {
        authorized({request, auth})  {
            try {
                const { pathname } = request.nextUrl // 遷移先のパス取得
                if( pathname === "/protected-page" ) return !!auth
                return true
            } catch (err) {
                console.log(err)
            }
        },
        // 認証完了後に生成されるJWTをカスタマイズする
        jwt({token, trigger, session}) {
            // ユーザーが更新された場合、トークンの名前を最新のユーザーネームにする（triggerはsigninやsignupなどがある）
            if (trigger === 'update') token.name = session.user.name
            return token
        }
    }
}

// NextAuthにconfigをいれてexport
export const { handlers, auth, signIn, signOut} = NextAuth(config)