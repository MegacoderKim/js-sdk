import {GetUrlParam} from 'ht-utility';
import {ResolveProperty} from '@nestjs/graphql';

export class PageDataResolver {
  @ResolveProperty('page_size')
  getPageSize(pageData) {
    return pageData.results.length;
  }
  @ResolveProperty('page')
  currentPage(pageData) {
    const preUrl = pageData.previous;
    let page = 1;
    if (preUrl) {
      const prevPage = GetUrlParam('page', pageData.previous) || 1;
      // console.log(prevPage);
      page = +prevPage + 1;
    }
    return page;
  }
};
