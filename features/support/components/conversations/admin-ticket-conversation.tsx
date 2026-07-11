"use client";

import Image from "next/image";
import Link from "next/link";

import { HeadsetIcon, MessageCircleDashedIcon, User2Icon } from "lucide-react";

import { ScrollArea } from "@/components/ui";
import {
	Attachment,
	AttachmentContent,
	AttachmentDescription,
	AttachmentGroup,
	AttachmentMedia,
	AttachmentTitle,
	AttachmentTrigger,
} from "@/components/ui/attachment";
import {
	Card,
	CardContent,
	CardFooter,
	CardHeader,
} from "@/components/ui/card";
import {
	Empty,
	EmptyDescription,
	EmptyHeader,
	EmptyMedia,
	EmptyTitle,
} from "@/components/ui/empty";
import {
	Message,
	MessageAvatar,
	MessageContent,
	MessageFooter,
	MessageGroup,
	MessageHeader,
} from "@/components/ui/message";
import {
	MessageScroller,
	MessageScrollerButton,
	MessageScrollerContent,
	MessageScrollerItem,
	MessageScrollerProvider,
	MessageScrollerViewport,
} from "@/components/ui/message-scroller";
import { Skeleton } from "@/components/ui/skeleton";
import { isImageFile, toIranDateTime } from "@/features/shared/utils";

import { useAdminTicketDetails } from "../../mutations";
import type { AttachmentType, TicketMessage } from "../../types";
import { AdminTicketReplyForm } from "../forms";

interface Props {
	ticket_id: string;
}

export function AdminTicketConversation({ ticket_id }: Props) {
	const { data, isLoading, isError } = useAdminTicketDetails(ticket_id);

	if (isLoading) return <LoadingState />;

	if (isError || !data?.success) return <ErrorState />;

	const ticket = data.data;

	if (!ticket) return <ErrorState />;

	if (ticket.messages.length === 0)
		return (
			<Card className="h-162.5">
				<CardContent>
					<EmptyState />
				</CardContent>
			</Card>
		);

	return (
		<MessageScrollerProvider>
			<Card className="h-162.5 pt-0 gap-0">
				<CardContent
					className={`
					overflow-hidden p-0 flex-1
					bg-[url('/images/chat-bg.jpg')]
					bg-cover bg-center bg-no-repeat h-full`}>
					<MessageScroller>
						<MessageScrollerViewport>
							<MessageScrollerContent className="py-3 pr-3">
								{ticket.messages.map((message, index) => (
									<MessageScrollerItem
										key={message.id}
										scrollAnchor={
											index === ticket.messages.length
										}>
										<TicketMessageItem message={message} />
									</MessageScrollerItem>
								))}
							</MessageScrollerContent>
						</MessageScrollerViewport>

						<MessageScrollerButton />
					</MessageScroller>
				</CardContent>

				<CardFooter className="border-t">
					<AdminTicketReplyForm
						ticketId={ticket.id}
						isClosed={ticket.status === "closed"}
					/>
				</CardFooter>
			</Card>
		</MessageScrollerProvider>
	);
}

interface MessageProps {
	message: TicketMessage;
}

function TicketMessageItem({ message }: MessageProps) {
	const date = toIranDateTime(message.created_at);

	return (
		<Message align={!message.is_staff_reply ? "end" : "start"}>
			<MessageAvatar className="aspect-square border">
				{message.is_staff_reply ? (
					<HeadsetIcon className="size-4" />
				) : (
					<User2Icon className="size-4" />
				)}
			</MessageAvatar>

			<MessageContent className="gap-0.5">
				<MessageHeader>
					<span className="text-white">
						{message.is_staff_reply
							? "پشتیبانی"
							: `${message.sender}`}
					</span>
				</MessageHeader>

				<MessageGroup>
					<ScrollArea className="max-h-60">
						{message.attachments &&
							message.attachments.length > 0 && (
								<AttachmentGroup className="flex flex-col items-end w-full">
									{message.attachments.map((attachment) => {
										return (
											<AttachmentHandler
												key={attachment.id}
												attachment={attachment}
											/>
										);
									})}
								</AttachmentGroup>
							)}
					</ScrollArea>
					<div
						className={`flex flex-col gap-2 rounded-xl px-4 py-3 whitespace-pre-wrap
						${
							message.is_staff_reply
								? "bg-teal-700 text-white w-fit"
								: "bg-white text-black"
						}
						`}>
						{message.message}
						<span className={`text-xs `}>{date.time}</span>
					</div>
				</MessageGroup>

				<MessageFooter
					className={`flex flex-col gap-1 text-white mt-1
					${!message.is_staff_reply ? "items-end" : "items-start"}
					bg-black/20 rounded-2xl px-4 py-2 w-fit backdrop-blur-2xl`}>
					<span className="text-[10px]">
						{date.dateWithMonthName}
					</span>
				</MessageFooter>
			</MessageContent>
		</Message>
	);
}

function AttachmentHandler({ attachment }: { attachment: AttachmentType }) {
	const isImage = isImageFile(attachment.file);

	return (
		<Attachment
			dir="rtl"
			key={attachment.id}
			size="default"
			orientation={"vertical"}
			className="bg-white hover:bg-white!">
			{isImage && (
				<AttachmentMedia className="border">
					<Image
						src={attachment.file}
						alt="فایل پیوست"
						width={64}
						height={64}
						unoptimized
					/>
				</AttachmentMedia>
			)}

			<AttachmentContent>
				<AttachmentTitle>فایل پیوست</AttachmentTitle>

				<AttachmentDescription>دانلود فایل</AttachmentDescription>
			</AttachmentContent>

			<AttachmentTrigger asChild>
				<Link
					href={attachment.file as "/"}
					target="_blank"
					rel="noopener noreferrer"
				/>
			</AttachmentTrigger>
		</Attachment>
	);
}

function EmptyState() {
	return (
		<Empty className="h-full">
			<EmptyHeader>
				<EmptyMedia variant="icon">
					<MessageCircleDashedIcon />
				</EmptyMedia>

				<EmptyTitle>هیچ پیامی وجود ندارد</EmptyTitle>

				<EmptyDescription>
					اولین پیام این گفتگو را ارسال کنید.
				</EmptyDescription>
			</EmptyHeader>
		</Empty>
	);
}

function ErrorState() {
	return (
		<Card className="h-162.5">
			<CardContent className="flex h-full items-center justify-center">
				<div className="text-center space-y-2">
					<p className="text-lg font-medium">خطا در دریافت اطلاعات</p>

					<p className="text-sm text-muted-foreground">
						لطفاً دوباره تلاش کنید.
					</p>
				</div>
			</CardContent>
		</Card>
	);
}

function LoadingState() {
	return (
		<Card className="h-162.5">
			<CardHeader>
				<Skeleton className="h-6 w-56" />
			</CardHeader>

			<CardContent className="space-y-6">
				{Array.from({ length: 10 }).map((_, i) => (
					<div key={i} className="flex gap-3">
						<Skeleton className="size-9 rounded-full" />

						<div className="space-y-2 flex-1">
							<Skeleton className="h-4 w-32" />
							<Skeleton className="h-20 w-full rounded-xl" />
							<Skeleton className="h-3 w-24" />
						</div>
					</div>
				))}
			</CardContent>
		</Card>
	);
}
