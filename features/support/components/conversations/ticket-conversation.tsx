"use client";

import Image from "next/image";
import Link from "next/link";

import { MessageCircleDashedIcon, ShieldIcon, User2Icon } from "lucide-react";

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

import { useTicketDetails } from "../../mutations";
import { TicketMessage } from "../../types";
import { TicketReplyForm } from "../forms";

interface Props {
	ticket_id: string;
}

export function TicketConversation({ ticket_id }: Props) {
	const { data, isLoading, isError } = useTicketDetails(ticket_id);

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
			<Card className="h-162.5">
				<CardContent className="overflow-hidden p-0 flex-1 h-full">
					<MessageScroller>
						<MessageScrollerViewport>
							<MessageScrollerContent className="p-6">
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
					<TicketReplyForm
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
		<Message align={message.is_staff_reply ? "end" : "start"}>
			<MessageAvatar className="aspect-square">
				{message.is_staff_reply ? (
					<ShieldIcon className="size-4" />
				) : (
					<User2Icon className="size-4" />
				)}
			</MessageAvatar>

			<MessageContent>
				<MessageHeader>
					{message.is_staff_reply ? "پشتیبانی" : "شما"}
				</MessageHeader>

				<MessageGroup>
					<ScrollArea className="max-h-24">
						{message.attachments &&
							message.attachments.length > 0 && (
								<AttachmentGroup className="flex flex-col items-end  w-full">
									{message.attachments.map((attachment) => {
										const isImage = isImageFile(
											attachment.file,
										);

										return (
											<Attachment
												key={attachment.id}
												size="default">
												{isImage && (
													<AttachmentMedia>
														<Image
															src={
																attachment.file
															}
															alt="فایل پیوست"
															width={64}
															height={64}
															unoptimized
														/>
													</AttachmentMedia>
												)}

												<AttachmentContent>
													<AttachmentTitle>
														فایل پیوست
													</AttachmentTitle>

													<AttachmentDescription>
														دانلود فایل
													</AttachmentDescription>
												</AttachmentContent>

												<AttachmentTrigger asChild>
													<Link
														href={
															attachment.file as "/"
														}
														target="_blank"
														rel="noopener noreferrer"
													/>
												</AttachmentTrigger>
											</Attachment>
										);
									})}
								</AttachmentGroup>
							)}
					</ScrollArea>
					<div
						className={`rounded-xl px-4 py-3 whitespace-pre-wrap
						${
							!message.is_staff_reply
								? "bg-primary/10 text-primary dark:bg-primary dark:text-primary-foreground"
								: "bg-muted text-muted-foreground"
						}
						`}>
						{message.message}
					</div>
				</MessageGroup>

				<MessageFooter>
					{date.dateWithMonthName} • {date.time}
				</MessageFooter>
			</MessageContent>
		</Message>
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
