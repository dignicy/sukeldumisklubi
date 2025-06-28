/**
* This file was @generated using pocketbase-typegen
*/

import type PocketBase from 'pocketbase'
import type { RecordService } from 'pocketbase'

export enum Collections {
	Users = "users",
	Clients = "clients",
	Events = "events",
	EventRegistrations = "event_registrations",
}

// Alias types for improved usability
export type IsoDateString = string
export type RecordIdString = string
export type HTMLString = string

// System fields
export type BaseSystemFields<T = never> = {
	id: RecordIdString
	created: IsoDateString
	updated: IsoDateString
	collectionId: string
	collectionName: Collections
	expand?: T
}

export type AuthSystemFields<T = never> = {
	email: string
	emailVisibility: boolean
	username: string
	verified: boolean
} & BaseSystemFields<T>

// Record types for each collection

export type UsersRecord = {
	avatar?: string
	name?: string
}

export type ClientsRecord = {
	email: string
	first_name: string
	last_name: string
	phone?: string
	emergency_phone?: string
}

export type EventsRecord = {
	title: string
	description: string
	excerpt?: string
	type: string
	startDate: string
	endDate?: string
	startTime?: string
	endTime?: string
	location: string
	image?: string
	price?: number
	maxParticipants?: number
	registrationDeadline?: string
	instructor?: string
	difficulty?: string
	pageSlug?: string
}

export type EventRegistrationsRecord = {
	client: RecordIdString
	event: RecordIdString
	status: 'waiting_confirmation' | 'confirmed' | 'paid' | 'cancelled'
	notes?: string
}

// Response types include system fields and match responses from the PocketBase API
export type UsersResponse<Texpand = unknown> = Required<UsersRecord> & AuthSystemFields<Texpand>
export type ClientsResponse<Texpand = unknown> = Required<ClientsRecord> & BaseSystemFields<Texpand>
export type EventsResponse<Texpand = unknown> = Required<EventsRecord> & BaseSystemFields<Texpand>
export type EventRegistrationsResponse<Texpand = unknown> = Required<EventRegistrationsRecord> & BaseSystemFields<Texpand>

// Types containing all Records and Responses, useful for creating typing helper functions

export type CollectionRecords = {
	users: UsersRecord
	clients: ClientsRecord
	events: EventsRecord
	event_registrations: EventRegistrationsRecord
}

export type CollectionResponses = {
	users: UsersResponse
	clients: ClientsResponse
	events: EventsResponse
	event_registrations: EventRegistrationsResponse
}

// Type for usage with type asserted PocketBase instance
// https://github.com/pocketbase/js-sdk#specify-typescript-definitions

export type TypedPocketBase = PocketBase & {
	collection(idOrName: 'users'): RecordService<UsersResponse>
	collection(idOrName: 'clients'): RecordService<ClientsResponse>
	collection(idOrName: 'events'): RecordService<EventsResponse>
	collection(idOrName: 'event_registrations'): RecordService<EventRegistrationsResponse>
}