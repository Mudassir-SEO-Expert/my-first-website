import "server-only";
// Future adapters belong here or in server-only modules. No public launch database required.
export interface InquiryDelivery {
  deliver(input: {
    name: string;
    email: string;
    message: string;
  }): Promise<{ id: string }>;
}
export interface ContentRepository {
  publishedCaseStudies(): Promise<readonly { slug: string; title: string }[]>;
}
export const contentRepository: ContentRepository = {
  async publishedCaseStudies() {
    return [];
  },
};
