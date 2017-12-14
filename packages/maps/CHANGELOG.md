# 0.0.13-beta
- Change google map default style
- Fire reset map on `!page.previous` condition. Resets map when first page is fetched
- Add `clearAllCluster` in trace to clear clusters of all marker to fix memory issue due to clearing each google map cluster removing individual markers. Causes flicker effect on clearing cluster.
- Remove duplicate clearCluster on 'removeAll' on cluster markers