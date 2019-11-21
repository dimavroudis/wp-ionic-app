export interface AppInfo {
	name: string;
	description: string;
	ulr: string;
	gmt_offset: string;
	timezone_string: string;
}

export interface Post {
	id: number;
	guid: { rendered: string };
	date: string;
	date_gmt: string;
	modified: string;
	modified_gmt: string;
	slug: string;
	status: PostStatus;
	type: string;
	title: { rendered: string; };
	content: { rendered: string };
	excerpt: { rendered: string };
	author: number;
	featured_media: number;
	comment_status: CommentStatus;
	sticky: boolean;
	meta: any[];
	categories: number[];
	tags: number[];
	format: PostFormat;
	_links: any;
	_embedded?: {
		'author'?: Array<User | WPError>,
		'wp:term'?: Array<Term | WPError>,
		'wp:category'?: Array<Term | WPError>,
		'wp:featuredmedia'?: Array<Media | WPError>
	};
}

export type PostFormat = 'aside' | 'chat' | 'gallery' | 'link' | 'image' | 'quote' | 'status' | 'video' | 'audio';

export type PostStatus = 'publish' | 'future' | 'draft' | 'pending' | 'private' | 'inherit';

export interface Media {
	id: number;
	date: string;
	date_gmt: string;
	guid: { rendered: string };
	link: string;
	modified: string;
	modified_gmt: string;
	slug: string;
	status: PostStatus;
	type: string;
	permalink_template: string;
	generated_slug: string;
	title: { rendered: string };
	author: number;
	comment_status: CommentStatus;
	ping_status: string;
	meta: any[];
	template: string;
	alt_text: string;
	caption: any;
	media_type: MediaType;
	mime_type: string;
	media_details: any;
	post: number;
	source_url: string;
	_embedded?: {
		author?: Array<User | WPError>
	};
}
export interface MediaDetails {
	width: number;
	height: number;
	file: string;
	sizes: MediaSize[];
	image_meta: any;
}


export interface MediaSize {
	width: number;
	height: number;
	file: string;
	mime_type: string;
	source_url: string;
}

export type MediaType = 'image' | 'file';

export interface Comment {
	id: number;
	author: number;
	author_email: string;
	author_ip: string;
	author_name: string;
	author_url: string;
	author_user_agent: string;
	content: { rendered: string };
	date: string;
	date_gmt: string;
	link: string;
	parent: number;
	post: number;
	status: string;
	type: string;
	author_avatar_urls: string[];
	meta: any[];
}

export type CommentStatus = 'open' | 'closed';

export interface Taxonomy {
	name: string;
	slug: string;
	description: string;
	types: string[];
	hierarchical: boolean;
	base: string;
	_links?: any;
}

export interface Term {
	id: number;
	count: number;
	description: string;
	link: string;
	name: string;
	slug: string;
	taxonomy: string;
	parent: number;
	meta: any[];
	_links?: any;
}

export interface User {
	id: number;
	name: string;
	url: string;
	description: string;
	link: string;
	slug: string;
	avatar_urls: any;
	_links?: any;
}


export interface SearchResult {
	id: number;
	type: string;
	title: string;
	url: string;
	subtype: string;
}

export interface WPError {
	code: string;
	message: string;
	data: any;
}


export class Factory<T> {
	constructor(private type: new () => T) { }

	getNew(): T {
		return new this.type();
	}
}
