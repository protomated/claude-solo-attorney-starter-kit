# How to Add a New Lead Magnet (Template)

This guide shows how I add a new lead magnet to the site. A lead magnet is a free downloadable template. It lives at `/templates/[slug]` on protomated.com. Each one is a 9-section landing page that ends in a free download and a bridge to the paid Build service.

I work in the WordPress admin at `https://protomated.ddev.site/wp/wp-admin/`. This guide assumes I am already logged in.

## Before I start

I gather these five things first. Filling the editor goes fast when I have them ready.


1. **The asset link.** A direct URL to the template file. Usually a GitHub link or a Google Drive share link. The visitor gets it by email after they fill the download form.
2. **The build format.** One of n8n workflow, Claude skill, or Google Workspace. This is a compliance decision, not just a label. More below.
3. **The pillar.** One of Get, Convert, Keep, Ops, or Authority.
4. **The tier.** Free or Build.
5. **The practice area.** Immigration, Family Law, Personal Injury, and so on. I use General if it fits every firm.

I also want a short outcome promise written out. That is the one hard result this template delivers.

## Why the build format matters

The build format drives three things at once. It sets the card badge on the `/templates` hub. It sets the hub filter. And it sets the compliance note that appears on the page.

I never write the compliance note myself. The site generates it from the format I pick. So picking the right format is the whole job here.

The rule is simple.

* **n8n workflow** or **Google Workspace** produces the green note: "never touches your legal work." These are for operational automation. They send, route, and move data. They do not draft or judge anything.
* **Claude skill** produces the amber note: "assisted draft, always reviewed." This is for anything that drafts text from input the attorney supplies.

If a template mixes formats, the amber Claude note wins. That is the safer default. When in doubt, I ask Dele before publishing.

## Step 1. Open the new lead magnet screen

In the left admin menu I click **Lead Magnets**, then **Add New**. The direct link is `https://protomated.com/wp/wp-admin/post-new.php?post_type=lead-magnet`.

The editor opens with a field group titled "Lead Magnet, 9-Section Landing." A grey help note sits at the top. It repeats the taxonomy rules. It is worth reading every time.

## Step 2. Set the title

At the top of the page I type the template name into the title field. It shows "No title" until I type. The title becomes the H1 and sets the URL slug. So I keep it clear and specific. "Client Intake Automation for Immigration Firms" reads better than "Intake Kit."

## Step 3. Set the four taxonomies in the sidebar

I do this before I fill any text fields. The sidebar sits on the right. I set all four boxes.


1. **Resource Formats.** The build format. I check exactly one of n8n workflow, Claude skill, or Google Workspace. This is the compliance decision from above.
2. **Pillar.** One of Get, Convert, Keep, Ops, or Authority.
3. **Tier.** Free or Build. Most free templates are Free.
4. **Practice Area.** The firm type this fits. I use General if it fits all firms.

There is also a **Resource Categories** box for the topic, such as Client Intake. This is optional but it keeps the hub organized. If I need a term that does not exist yet, I ask Dele first. The list is deliberately short.

## Step 4. Set the featured image

In the sidebar I click **Set featured image** and pick the card image. It shows on the `/templates` hub card, so I want it clean and readable at small size.

## Step 5. Fill the hero fields

* **Format Pill (top of hero).** A small label above the H1, such as "n8n workflow."
* **Complexity Pill.** The difficulty tag, such as "Beginner." I keep this honest. It sets the reader's expectation for setup effort.
* **Scope Pill.** A short scope tag, such as "Single-firm."
* **Outcome Promise (under H1).** One or two sentences. This is required.
* **Hero Meta Items.** Small icon plus label items. I click **Add Meta Item** for each. The icon is a single emoji. The text is a short label.

## Step 6. Set the preview

* **Preview Image.** An image of the template in use. This takes priority.
* **Preview Loom URL.** A Loom link. This is the fallback if I leave the image blank.

## Step 7. Set the download and the gate

* **Download URL.** Required. The direct link to the asset. The visitor gets it by email after submitting the form.
* **Gate, Optional Context Placeholder.** Placeholder text for the optional question on the form.
* **Show Practice Area Selector.** A toggle. I turn it on only when the right template variant depends on practice area. Most of the time I leave it off.

## Step 8. Fill "What's Inside"

A repeater. Each row is a title plus a one-line description. I click **Add Item** for each inclusion. I keep each line concrete.

## Step 9. Fill the fit sections

* **Works Great When (green card).** Three scenarios where the template fits well. I make each one specific to a solo or small firm.
* **What Breaks at Scale (red card).** Three failure modes. This is where the free template stops being enough. It is the honest bridge to the paid Build. The red card builds trust and sets up the sale.

## Step 10. Fill the Build bridge

The dark card that points to the paid service.

* **Build Bridge Intro Paragraph.** A short intro for the card.
* **Build Price Range.** The canonical range is $5,000 to $15,000. I write "$5k to $15k" unless this build is scoped differently.
* **Build Duration.** The typical timeline, such as "2 to 3 weeks."
* **Build Deliverables.** A repeater. What the client gets at completion. I click **Add Deliverable** for each.
* **Build Client Quote.** Optional. I leave this blank unless I have a real quote I can attribute. I never invent one.
* **Build Quote Attribution.** The source of that quote. I only fill this if the quote is filled.

## Step 11. Fill the FAQ

A repeater that renders as an accordion. The standard set is four items: platform, compatibility, compliance, and customize-for-hire. Each row is a question plus an answer. I phrase the question the way a firm owner would ask it. I keep the answer to operational and product facts. No legal advice.

## Step 12. Set related resources

**Related Resources** is a picker. I can link up to three other templates or resources. They show at the bottom of the page.

## Step 13. Save as draft and preview

I click **Save draft**, then **Preview**. I check three things. First, the compliance note reads correctly: green for n8n and Google Workspace, amber for Claude skill. If it is wrong, my Resource Format is wrong, so I fix the format, not the text. Second, the download link works. Third, the page reads well end to end.

## Step 14. Publish

When it looks right I click **Publish**, then confirm. The new template appears on the `/templates` hub right away. The card badge, pillar pill, tier badge, and practice-area filter all come from the taxonomies I set in Step 3.

## Quick checklist

* Title is clear and specific
* Resource Format set to exactly one format (the compliance decision)
* Pillar, Tier, and Practice Area all set
* Featured image set
* Outcome Promise filled
* Download URL filled and working
* What's Inside listed
* Works Great When and What Breaks at Scale both filled
* Build price and duration match the canonical range
* No invented client quotes
* Preview checked: compliance note, download link, full read

## A note on the SEO plugin

I do not need to touch RankMath for the template to be indexed. The site forces every `/templates` page and every template single to index and follow. If I ever see a "noindex" warning on a template, I flag it to Dele. It should not happen.