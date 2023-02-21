import type {ListResponse} from "./model";

export class DataSource<T> {
    data: T[]
    private page: number;
    private readonly page_size: number;
    private readonly source: (page: number, page_size: number) => Promise<ListResponse<T>>;

    private hasMore: boolean = false;

    constructor(data: T[], page: number = 0, page_size: number = 30, source: (page: number, page_size: number) => Promise<ListResponse<T>>) {
        this.data = data;
        this.page = page;
        this.page_size = page_size;
        this.source = source;
        this.hasMore = true;
    }

    public getHasMore(): boolean {
        return this.hasMore;
    }

    public async next() {
        if (!this.hasMore) {
            return;
        }

        let new_data = await this.source(this.page, this.page_size);

        if (new_data.data.length == 0) {
            this.hasMore = false;
            return;
        }

        this.data = [
            ...this.data,
            ...new_data.data,
        ];

        this.page += 1;
    }

    public reset() {
        this.hasMore = false;
        this.page = 0;
        this.data = [];
    }
}