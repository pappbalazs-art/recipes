import "@/styles/globals.css";
import { Metadata, Viewport } from "next";
import { Link } from "@heroui/link";
import clsx from "clsx";

import { Providers } from "./providers";

import { siteConfig } from "@/config/site";
import { fontSans } from "@/config/fonts";

export const metadata: Metadata = {
	title: {
		default: siteConfig.name,
		template: `%s - ${siteConfig.name}`,
	},
	description: siteConfig.description,
	icons: [
		{
			url: "/favicon.ico",
		},
		{
			url: "/media/icon-72.png",
			sizes: "72x72",
			rel: "apple-touch-icon",
		},
		{
			url: "/media/icon-96.png",
			sizes: "96x96",
			rel: "apple-touch-icon",
		},
		{
			url: "/media/icon-144.png",
			sizes: "144x144",
			rel: "apple-touch-icon",
		},
		{
			url: "/media/icon-168.png",
			sizes: "168x168",
			rel: "apple-touch-icon",
		},
		{
			url: "/media/icon-180.png",
			sizes: "180x180",
			rel: "apple-touch-icon",
		},
		{
			url: "/media/icon-192.png",
			sizes: "192x192",
			rel: "apple-touch-icon",
		},
		{
			url: "/media/icon-256.png",
			sizes: "256x256",
			rel: "apple-touch-icon",
		},
		{
			url: "/media/icon-512.png",
			sizes: "512x512",
			rel: "apple-touch-icon",
		},
	],
	appleWebApp: {
		capable: true,
		title: "Kinga's Recipes",
		statusBarStyle: "default",
		startupImage: [
			{
				media: "screen and (device-width: 1024px) and (device-height: 1366px) and (-webkit-device-pixel-ratio: 2) and (orientation: portrait)",
				url: "/media/12.9__iPad_Pro_portrait.png",
			},
			{
				media: "screen and (device-width: 320px) and (device-height: 568px) and (-webkit-device-pixel-ratio: 2) and (orientation: landscape)",
				url: "/media/4__iPhone_SE__iPod_touch_5th_generation_and_later_landscape.png",
			},
			{
				media: "screen and (device-width: 810px) and (device-height: 1080px) and (-webkit-device-pixel-ratio: 2) and (orientation: landscape)",
				url: "/media/10.2__iPad_landscape.png",
			},
			{
				media: "screen and (device-width: 402px) and (device-height: 874px) and (-webkit-device-pixel-ratio: 3) and (orientation: landscape)",
				url: "/media/iPhone_16_Pro_landscape.png",
			},
			{
				media: "screen and (device-width: 834px) and (device-height: 1194px) and (-webkit-device-pixel-ratio: 2) and (orientation: portrait)",
				url: "/media/11__iPad_Pro__10.5__iPad_Pro_portrait.png",
			},
			{
				media: "screen and (device-width: 440px) and (device-height: 956px) and (-webkit-device-pixel-ratio: 3) and (orientation: landscape)",
				url: "/media/iPhone_16_Pro_Max_landscape.png",
			},
			{
				media: "screen and (device-width: 1032px) and (device-height: 1376px) and (-webkit-device-pixel-ratio: 2) and (orientation: landscape)",
				url: "/media/13__iPad_Pro_M4_landscape.png",
			},
			{
				media: "screen and (device-width: 768px) and (device-height: 1024px) and (-webkit-device-pixel-ratio: 2) and (orientation: landscape)",
				url: "/media/9.7__iPad_Pro__7.9__iPad_mini__9.7__iPad_Air__9.7__iPad_landscape.png",
			},
			{
				media: "screen and (device-width: 834px) and (device-height: 1194px) and (-webkit-device-pixel-ratio: 2) and (orientation: landscape)",
				url: "/media/11__iPad_Pro__10.5__iPad_Pro_landscape.png",
			},
			{
				media: "screen and (device-width: 428px) and (device-height: 926px) and (-webkit-device-pixel-ratio: 3) and (orientation: landscape)",
				url: "/media/iPhone_14_Plus__iPhone_13_Pro_Max__iPhone_12_Pro_Max_landscape.png",
			},
			{
				media: "screen and (device-width: 834px) and (device-height: 1210px) and (-webkit-device-pixel-ratio: 2) and (orientation: portrait)",
				url: "/media/11__iPad_Pro_M4_portrait.png",
			},
			{
				media: "screen and (device-width: 375px) and (device-height: 667px) and (-webkit-device-pixel-ratio: 2) and (orientation: portrait)",
				url: "/media/iPhone_8__iPhone_7__iPhone_6s__iPhone_6__4.7__iPhone_SE_portrait.png",
			},
			{
				media: "screen and (device-width: 393px) and (device-height: 852px) and (-webkit-device-pixel-ratio: 3) and (orientation: portrait)",
				url: "/media/iPhone_16__iPhone_15_Pro__iPhone_15__iPhone_14_Pro_portrait.png",
			},
			{
				media: "screen and (device-width: 375px) and (device-height: 812px) and (-webkit-device-pixel-ratio: 3) and (orientation: portrait)",
				url: "/media/iPhone_13_mini__iPhone_12_mini__iPhone_11_Pro__iPhone_XS__iPhone_X_portrait.png",
			},
			{
				media: "screen and (device-width: 414px) and (device-height: 896px) and (-webkit-device-pixel-ratio: 3) and (orientation: portrait)",
				url: "/media/iPhone_11_Pro_Max__iPhone_XS_Max_portrait.png",
			},
			{
				media: "screen and (device-width: 810px) and (device-height: 1080px) and (-webkit-device-pixel-ratio: 2) and (orientation: portrait)",
				url: "/media/10.2__iPad_portrait.png",
			},
			{
				media: "screen and (device-width: 820px) and (device-height: 1180px) and (-webkit-device-pixel-ratio: 2) and (orientation: landscape)",
				url: "/media/10.9__iPad_Air_landscape.png",
			},
			{
				media: "screen and (device-width: 428px) and (device-height: 926px) and (-webkit-device-pixel-ratio: 3) and (orientation: portrait)",
				url: "/media/iPhone_14_Plus__iPhone_13_Pro_Max__iPhone_12_Pro_Max_portrait.png",
			},
			{
				media: "screen and (device-width: 402px) and (device-height: 874px) and (-webkit-device-pixel-ratio: 3) and (orientation: portrait)",
				url: "/media/iPhone_16_Pro_portrait.png",
			},
			{
				media: "screen and (device-width: 414px) and (device-height: 896px) and (-webkit-device-pixel-ratio: 3) and (orientation: landscape)",
				url: "/media/iPhone_11_Pro_Max__iPhone_XS_Max_landscape.png",
			},
			{
				media: "screen and (device-width: 1032px) and (device-height: 1376px) and (-webkit-device-pixel-ratio: 2) and (orientation: portrait)",
				url: "/media/13__iPad_Pro_M4_portrait.png",
			},
			{
				media: "screen and (device-width: 414px) and (device-height: 896px) and (-webkit-device-pixel-ratio: 2) and (orientation: portrait)",
				url: "/media/iPhone_11__iPhone_XR_portrait.png",
			},
			{
				media: "screen and (device-width: 320px) and (device-height: 568px) and (-webkit-device-pixel-ratio: 2) and (orientation: portrait)",
				url: "/media/4__iPhone_SE__iPod_touch_5th_generation_and_later_portrait.png",
			},
			{
				media: "screen and (device-width: 834px) and (device-height: 1112px) and (-webkit-device-pixel-ratio: 2) and (orientation: portrait)",
				url: "/media/10.5__iPad_Air_portrait.png",
			},
			{
				media: "screen and (device-width: 430px) and (device-height: 932px) and (-webkit-device-pixel-ratio: 3) and (orientation: portrait)",
				url: "/media/iPhone_16_Plus__iPhone_15_Pro_Max__iPhone_15_Plus__iPhone_14_Pro_Max_portrait.png",
			},
			{
				media: "screen and (device-width: 744px) and (device-height: 1133px) and (-webkit-device-pixel-ratio: 2) and (orientation: landscape)",
				url: "/media/8.3__iPad_Mini_landscape.png",
			},
			{
				media: "screen and (device-width: 1024px) and (device-height: 1366px) and (-webkit-device-pixel-ratio: 2) and (orientation: landscape)",
				url: "/media/12.9__iPad_Pro_landscape.png",
			},
			{
				media: "screen and (device-width: 834px) and (device-height: 1210px) and (-webkit-device-pixel-ratio: 2) and (orientation: landscape)",
				url: "/media/11__iPad_Pro_M4_landscape.png",
			},
			{
				media: "screen and (device-width: 393px) and (device-height: 852px) and (-webkit-device-pixel-ratio: 3) and (orientation: landscape)",
				url: "/media/iPhone_16__iPhone_15_Pro__iPhone_15__iPhone_14_Pro_landscape.png",
			},
			{
				media: "screen and (device-width: 430px) and (device-height: 932px) and (-webkit-device-pixel-ratio: 3) and (orientation: landscape)",
				url: "/media/iPhone_16_Plus__iPhone_15_Pro_Max__iPhone_15_Plus__iPhone_14_Pro_Max_landscape.png",
			},
			{
				media: "screen and (device-width: 390px) and (device-height: 844px) and (-webkit-device-pixel-ratio: 3) and (orientation: portrait)",
				url: "/media/iPhone_14__iPhone_13_Pro__iPhone_13__iPhone_12_Pro__iPhone_12_portrait.png",
			},
			{
				media: "screen and (device-width: 744px) and (device-height: 1133px) and (-webkit-device-pixel-ratio: 2) and (orientation: portrait)",
				url: "/media/8.3__iPad_Mini_portrait.png",
			},
			{
				media: "screen and (device-width: 834px) and (device-height: 1112px) and (-webkit-device-pixel-ratio: 2) and (orientation: landscape)",
				url: "/media/10.5__iPad_Air_landscape.png",
			},
			{
				media: "screen and (device-width: 440px) and (device-height: 956px) and (-webkit-device-pixel-ratio: 3) and (orientation: portrait)",
				url: "/media/iPhone_16_Pro_Max_portrait.png",
			},
			{
				media: "screen and (device-width: 414px) and (device-height: 736px) and (-webkit-device-pixel-ratio: 3) and (orientation: landscape)",
				url: "/media/iPhone_8_Plus__iPhone_7_Plus__iPhone_6s_Plus__iPhone_6_Plus_landscape.png",
			},
			{
				media: "screen and (device-width: 414px) and (device-height: 896px) and (-webkit-device-pixel-ratio: 2) and (orientation: landscape)",
				url: "/media/iPhone_11__iPhone_XR_landscape.png",
			},
			{
				media: "screen and (device-width: 375px) and (device-height: 667px) and (-webkit-device-pixel-ratio: 2) and (orientation: landscape)",
				url: "/media/iPhone_8__iPhone_7__iPhone_6s__iPhone_6__4.7__iPhone_SE_landscape.png",
			},
			{
				media: "screen and (device-width: 375px) and (device-height: 812px) and (-webkit-device-pixel-ratio: 3) and (orientation: landscape)",
				url: "/media/iPhone_13_mini__iPhone_12_mini__iPhone_11_Pro__iPhone_XS__iPhone_X_landscape.png",
			},
			{
				media: "screen and (device-width: 414px) and (device-height: 736px) and (-webkit-device-pixel-ratio: 3) and (orientation: portrait)",
				url: "/media/iPhone_8_Plus__iPhone_7_Plus__iPhone_6s_Plus__iPhone_6_Plus_portrait.png",
			},
			{
				media: "screen and (device-width: 768px) and (device-height: 1024px) and (-webkit-device-pixel-ratio: 2) and (orientation: portrait)",
				url: "/media/9.7__iPad_Pro__7.9__iPad_mini__9.7__iPad_Air__9.7__iPad_portrait.png",
			},
			{
				media: "screen and (device-width: 820px) and (device-height: 1180px) and (-webkit-device-pixel-ratio: 2) and (orientation: portrait)",
				url: "/media/10.9__iPad_Air_portrait.png",
			},
			{
				media: "screen and (device-width: 390px) and (device-height: 844px) and (-webkit-device-pixel-ratio: 3) and (orientation: landscape)",
				url: "/media/iPhone_14__iPhone_13_Pro__iPhone_13__iPhone_12_Pro__iPhone_12_landscape.png",
			},
		],
	},
	other: {
		"apple-mobile-web-app-capable": "yes",
	},
	manifest: "/manifest.json",
};

export default function RootLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<html suppressHydrationWarning lang="en">
			<body
				className={clsx(
					"min-h-screen bg-background font-sans antialiased",
					fontSans.variable
				)}
			>
				<Providers
					themeProps={{ attribute: "class", defaultTheme: "dark" }}
				>
					<div className="relative flex flex-col h-screen">
						<main className="container mx-auto max-w-md py-8 px-6 flex-grow">
							{children}
						</main>
					</div>
				</Providers>
			</body>
		</html>
	);
}
