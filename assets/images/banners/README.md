# Banner & page background images (JPG)

Upload your photos **in this folder** (`assets/images/banners/`) using the file names below.
Replace a file with your own JPG of the same name and the page updates automatically.
Recommended: **1920 x 800 px**, JPG, under ~400 KB. Keep the subject on the right side
for the two home pages (the headline / quote card sits on the left).

| File name                       | Used on                                   | Where the path is set                      |
|---------------------------------|-------------------------------------------|--------------------------------------------|
| home-1.jpg                      | index.html (Home 1 hero)                  | `--banner-home-1` in assets/css/banners.css |
| home-2.jpg                      | index-2.html (Home 2 hero)                | `--banner-home-2`                          |
| about.jpg                       | about.html                                | `--banner-about`                           |
| services.jpg                    | services.html                             | `--banner-services`                        |
| service-details.jpg             | service-details.html                      | `--banner-service-details`                 |
| areas-served.jpg                | areas-served.html                         | `--banner-areas-served`                    |
| pricing.jpg                     | pricing.html                              | `--banner-pricing`                         |
| blog.jpg                        | blog.html                                 | `--banner-blog`                            |
| blog-details.jpg                | blog-details.html                         | `--banner-blog-details`                    |
| contact.jpg                     | contact.html                              | `--banner-contact`                         |
| faq.jpg                         | faq.html                                  | `--banner-faq`                             |
| inspection-booking.jpg          | inspection-booking.html                   | `--banner-inspection-booking`              |
| auth-bg.jpg                     | login.html, register.html, forgot-password.html | `--banner-auth`                      |
| error-404.jpg                   | 404.html                                  | `--banner-404`                             |
| coming-soon.jpg                 | coming-soon.html                          | `--banner-coming-soon`                     |
| maintenance.jpg                 | maintenance.html                          | `--banner-maintenance`                     |
| inspection-confirmation.jpg     | inspection-confirmation.html              | `--banner-confirmation`                    |

To use a different file name or folder, edit the matching `url('../images/banners/...')`
line at the top of `assets/css/banners.css`. The overlay darkness on inner banners is
`--banner-overlay` in the same file (0 = photo only, 1 = solid colour).
Current files are neutral placeholders - replace them with your photos.
