<template>
    <q-ajax-bar ref="bar" position="top" color="accent" size="10px" />
    <q-btn v-if="nxt" class="fixed_right tw-hover:scale-110" @click="nextIpo(nxt)" icon="navigate_next" :title="nxt.company_name" />
    <q-btn v-if="pre" class="fixed_left tw-hover:scale-110" @click="nextIpo(pre)" icon="navigate_before" :title="pre.company_name" />
    <q-page class="q-pa-md">
        <div :style="'background-image: url(\''+ipo.header_img+'\'); height:250px; background-size:cover'">
          <img :src="ipo.company_logo" style="width: 150px; height: 150px; position: absolute; top: 100px; left: 50px; background-color:aliceblue; padding:1rem">
        </div>
        <q-card flat class="rounded-border bg-orange-2">
            <!-- Header Section -->
            <q-card-section>
                <div class="text-h3 text-deep-orange-6 text-left q-pb-md" style="font-family: 'Josefin Sans', sans-serif;">{{ipo.company_name}}<span v-if="ipo.ipo_type === 'SME'" class="text-h6">({{ipo.ipo_type}})</span></div> 
                <div class="q-pa-sm flex q-gutter-sm bg-orange-3 rounded-borders">
                    <span><a :href="ipo.company_url" target="_blank">{{ipo.company_url}}</a> </span><q-separator color="orange" vertical /><span v-if="listingNse && listingNse.url"><a :href="listingNse.url" target="_blank">NSE</a></span><q-separator color="orange" vertical  v-if="listingNse && listingNse.url" /><span v-if="listingBse && listingBse.url"><a :href="listingBse.url" target="_blank">BSE</a></span><q-separator color="orange" vertical  v-if="listingBse && listingBse.url" /><span v-if="ipo.rhp_url"><a :href="ipo.rhp_url" target="_blank">Offer Document</a></span><q-separator color="orange" vertical  v-if="ipo.rhp_url" /><span> Registrar: <a :href="ipo?.registrar?.url" target="_blank">{{ipo?.registrar?.name}}</a></span> 
                </div> 
            </q-card-section>

            <!-- Current Overview -->
            <q-card-section v-if="listingNse && listingNse.listing_date">
                <div class="row q-col-gutter-sm">
                    <div class="col-12 col-md-4 bg-orange-1">
                        <div v-if="nseLive" id="nse-live" class="bg-orange-3">
                            <h3 :class="(nseLive.change > 0) ? 'text-positive text-h3': 'text-negative text-h3'">{{nseLive?.lastPrice}}</h3>
                            <h5 :class="(nseLive.change > 0) ? 'text-positive': 'text-negative'">{{nseLive?.change}} <span>({{nseLive?.pChange}}%) <q-icon v-if="nseLive.change > 0" name="arrow_upward" color="positive" /> <q-icon v-if="nseLive.change < 0" name="arrow_downward" color="negative" /></span></h5>
                            <p class="text-subtitle2">{{date.formatDate(nseLive?.lastUpdate, 'DD-MMMYYYY | HH:mm:ss')}}</p>
                        </div>
                        <div>
                            <q-item>
                            <q-item-section>
                                <q-item-label overline>BSE Scrip Code</q-item-label>
                                <q-item-label class="text-bold">{{listingBse?.scrip_code}}</q-item-label>
                            </q-item-section>
                            <q-item-section>
                                <q-item-label overline class="text-right">NSE Symbol</q-item-label>
                                <q-item-label class="text-bold text-right">{{listingNse?.scrip_code}}</q-item-label>
                            </q-item-section>
                            </q-item>
                            <q-separator />
                            <q-item>
                            <q-item-section>
                                <q-item-label overline>Face Value</q-item-label>
                                <q-item-label class="text-bold">&#8377;{{nseLive?.faceValue}}</q-item-label>
                            </q-item-section>
                            <q-item-section>
                                <q-item-label class="text-right">ISIN </q-item-label>
                                <q-item-label class="text-bold text-right">{{nseLive?.isinCode}}</q-item-label>
                            </q-item-section>
                            </q-item>
                            <q-separator />
                            <q-item>
                            <q-item-section>
                                <q-item-label overline>Open</q-item-label>
                                <q-item-label class="text-bold">{{nseLive.open}}</q-item-label>
                            </q-item-section>
                            <q-item-section>
                                <q-item-label overline class="text-right">Close</q-item-label>
                                <q-item-label class="text-bold text-right">{{(nseLive && nseLive.closePrice > 0) ? nseLive.closePrice : 'Live'}}</q-item-label>
                            </q-item-section>
                            </q-item>
                            <q-separator />
                            <q-item>
                            <q-item-section>
                                <q-item-label overline>Day High</q-item-label>
                                <q-item-label class="text-bold">{{nseLive.dayHigh}}</q-item-label>
                            </q-item-section>
                            <q-item-section>
                                <q-item-label overline class="text-right">Day Low</q-item-label>
                                <q-item-label class="text-bold text-right">{{nseLive?.dayLow}}</q-item-label>
                            </q-item-section>
                            </q-item>
                            <q-separator />
                            <q-item>
                            <q-item-section>
                                <q-item-label overline>Day Volume</q-item-label>
                                <q-item-label class="text-bold">{{nseLive?.quantityTraded}}</q-item-label>
                            </q-item-section>
                            <q-item-section>
                                <q-item-label overline class="text-right">Total Turnover</q-item-label>
                                <q-item-label class="text-bold text-right" v-if="nseLive.totalTradedValue">&#8377;{{parseToCr(nseLive.totalTradedValue)}} Cr</q-item-label>
                            </q-item-section>
                            </q-item>
                        </div>
                    </div>
                    <div class="col-12 col-md-4 bg-orange-1">
                        <div>
                            <q-item>
                            <q-item-section>
                                <q-item-label overline class="text">Listing Date</q-item-label>
                                <q-item-label class="text-bold">{{date.formatDate(listingNse?.listing_date, 'DD-MMM-YYYY')}}</q-item-label>
                            </q-item-section>
                            <q-item-section>
                                <q-item-label overline class="text-right">Issue Price</q-item-label>
                                <q-item-label class="text-bold text-right">&#8377;{{ipo?.issue_price}}</q-item-label>
                            </q-item-section>
                            </q-item>
                            <q-separator />
                            <q-item>
                                <q-item-section>
                                <q-item-label overline class="text">Listing Price NSE</q-item-label>
                                <q-item-label class="text-bold">&#8377;{{listingNse?.listing_price}}</q-item-label>
                            </q-item-section>
                            <q-item-section>
                                <q-item-label overline class="text-right">Listing Price BSE</q-item-label>
                                <q-item-label class="text-bold text-right">&#8377;{{listingBse?.listing_price}}</q-item-label>
                            </q-item-section>
                            </q-item>
                            <q-separator />
                            <q-item>
                            <q-item-section>
                                <q-item-label class="text-subtitle1 q-pb-sm q-pt-md">Listing Day Low and High (NSE)</q-item-label>
                                <vue-slider :processStyle="style" :railStyle="style" :min="Math.round(listingNse?.low)" :max="Math.round(listingNse?.high)" v-model="listingClose" width="100%" disabled />
                            </q-item-section>
                            </q-item>
                            <q-item dense v-if="listingNse">
                                <q-item-section>
                                <q-item-label class="text-bold">{{listingNse?.low}}</q-item-label>
                            </q-item-section>
                            <q-item-section>
                                <q-item-label class="text-bold text-right">{{listingNse?.high}}</q-item-label>
                            </q-item-section>
                            </q-item>
                            
                            <q-separator />
                            <q-item v-if="nseLive && nseLive.low52">
                            <q-item-section>
                                <q-item-label class="text-subtitle1 q-pb-sm">52 Week Low and High (NSE)</q-item-label>
                                <vue-slider :processStyle="style" :railStyle="style" :min="Math.round(nseLive.low52.replace(/,/g, ''))" :max="Math.round(nseLive.high52.replace(/,/g, ''))" v-model="liveClose" width="100%" disabled />
                            </q-item-section>
                            </q-item>
                            <q-item dense v-if="nseLive">
                            <q-item-section>
                                <q-item-label class="text-bold">{{nseLive.low52}}</q-item-label>
                                <q-item-label overline>{{nseLive.cm_adj_low_dt}}</q-item-label>
                            </q-item-section>
                            <q-item-section>
                                <q-item-label class="text-bold text-right">{{nseLive?.high52}}</q-item-label>
                                <q-item-label overline class="text-right">{{nseLive.cm_adj_high_dt}}</q-item-label>
                            </q-item-section>
                            </q-item>
                            <q-separator />
                            <q-item v-if="dayEnd && dayEnd.eod">
                            <q-item-section>
                                <q-item-label class="text-subtitle1 q-pb-sm">Lifetime Low and High (NSE)</q-item-label>
                                <vue-slider :processStyle="style" :railStyle="style" :min="Math.round(dayEnd.eod.LifeTimeLow)" :max="Math.round(dayEnd.eod.LifeTimeHigh)" v-model="liveClose" width="100%" disabled />
                            </q-item-section>
                            </q-item>
                            <q-item dense v-if="dayEnd && dayEnd.eod">
                                <q-item-section>
                                <q-item-label class="text-bold">{{dayEnd?.eod?.LifeTimeLow}}</q-item-label>
                                <q-item-label overline>{{date.formatDate(dayEnd?.eod?.lowdate, 'DD-MMM-YYYY')}}</q-item-label>
                            </q-item-section>
                            <q-item-section v-if="dayEnd && dayEnd.eod">
                                <q-item-label class="text-bold text-right">{{dayEnd?.eod?.LifeTimeHigh}}</q-item-label>
                                <q-item-label overline class="text-right">{{date.formatDate(dayEnd?.eod?.highdate, 'DD-MMM-YYYY')}}</q-item-label>
                            </q-item-section>
                            </q-item>
                            <q-separator />
                        </div>
                    </div>
                    <div class="col-12 col-md-4 bg-orange-1">
                        <div>
                        <q-item>
                            <q-item-section>
                            <q-item-label class="text-h6 text-deep-orange-6">Return Calculations</q-item-label>
                            </q-item-section>
                        </q-item>
                        <q-item>
                            <q-item-section>
                            <q-item-label overline class="text-left">CAGR</q-item-label>
                            </q-item-section>
                            <q-item-section>
                            <q-item-label class="text-bold text-right" v-if="nseLive.lastPrice && ipo.issue_price">{{cagr()}}</q-item-label>
                            </q-item-section>
                        </q-item>
                        <q-item>
                            <q-item-section>
                            <q-item-label overline class="text-left">Return in %</q-item-label>
                            </q-item-section>
                            <q-item-section>
                            <q-item-label class="text-bold text-right" v-if="nseLive.lastPrice && ipo.issue_price">{{preturn()}}%</q-item-label>
                            </q-item-section>
                        </q-item>
                        <q-item>
                            <q-item-section>
                            <q-item-label overline class="text-left">Return per allotment</q-item-label>
                            </q-item-section>
                            <q-item-section>
                            <q-item-label class="text-bold text-right" v-if="nseLive.lastPrice && ipo.issue_price">Rs. {{allotReturn()}}</q-item-label>
                            </q-item-section>
                        </q-item>
                        <q-separator />
                        <q-item>
                            <q-item-section>
                            <q-item-label class="text-h6 text-deep-orange-6">Market Cap ({{mCapType()}})</q-item-label>
                            </q-item-section>
                        </q-item>
                        <q-item>
                            <q-item-section>
                            <q-item-label overline class="text-left">At the time of IPO</q-item-label>
                            </q-item-section>
                            <q-item-section>
                            <q-item-label class="text-bold text-right">{{mcapAtIpo()}}</q-item-label>
                            </q-item-section>
                        </q-item>
                        <q-item>
                            <q-item-section>
                            <q-item-label overline class="text-left">At the time of Listing</q-item-label>
                            </q-item-section>
                            <q-item-section>
                            <q-item-label class="text-bold text-right">{{mcapAtListing()}}</q-item-label>
                            </q-item-section>
                        </q-item>
                        <q-item>
                            <q-item-section>
                            <q-item-label overline class="text-left">Current Market Cap</q-item-label>
                            </q-item-section>
                            <q-item-section>
                            <q-item-label class="text-bold text-right">{{curMCap()}}</q-item-label>
                            </q-item-section>
                        </q-item>
                        </div>
                    </div>
                </div>
            </q-card-section>

        <!-- Issue Overview -->
            <q-card-section>
                <div class="text-h5" style="font-family: 'Josefin Sans', sans-serif;">Issue Overview</div>

                <div class="row q-col-gutter-sm">
                <div class="col-12 col-md-4 q-ma-sm bg-orange-1">
                    <div v-if="ipo.price_band_low && ipo.price_band_low > 0">
                        <q-item-label overline>Price Band</q-item-label>
                        <q-item-label><span class="text-bold">&#8377;{{ipo.price_band_low}} - &#8377;{{ipo.price_band_high}}</span></q-item-label>
                    </div>
                    <div v-else>
                        <q-item-label overline>Price</q-item-label>
                        <q-item-label><span class="text-bold">&#8377;{{ipo.price_band_high}}</span></q-item-label>
                    </div>
                    <q-separator spaced color="orange" />
                    <q-item-label overline>Lot Size and Amount</q-item-label>
                    <q-item-label><span class="text-bold">{{ipo.lot_size}} Shares @ &#8377;{{ipo.lot_size * ipo.price_band_high}}</span></q-item-label>
                    <q-separator spaced color="orange" />
                    <q-item-label overline>Issue/Bid Opens on </q-item-label>
                    <q-item-label><span class="text-bold">{{date.formatDate(ipo.open_date, 'dddd, Do MMMM, YYYY')}}</span></q-item-label>
                    <q-separator spaced color="orange" />
                    <q-item-label overline>Issue/Bid Closes on</q-item-label>
                    <q-item-label><span class="text-bold">{{date.formatDate(ipo.close_date, 'dddd, Do MMMM, YYYY')}}</span></q-item-label>
                    <q-separator spaced color="orange" />
                    <q-item-label overline>Anchor Investors bids on </q-item-label>
                    <q-item-label><span class="text-bold">{{date.formatDate(ipo.anchor_date, 'dddd, Do MMMM, YYYY')}}</span></q-item-label>
                    <q-separator spaced color="orange" />
                    <q-item-label overline>Registrar</q-item-label>
                    <q-item-label><span class="text-bold">{{ipo.registrar?.name}}</span></q-item-label>
                    <q-separator spaced color="orange" />
                </div>
                <div class="col-12 col-md-4 q-ma-sm bg-orange-1">
                    <q-item-label overline>Issue Size</q-item-label>
                    <q-item-label><span class="text-bold">&#8377;{{formatNum((ipo.fresh_issue + ipo.offer_for_sale) * ipo.price_band_high)}}</span></q-item-label>
                    <q-separator spaced color="orange" />
                    <q-item-label overline>Fresh Issue</q-item-label>
                    <q-item-label><span class="text-bold">{{(ipo.fresh_issue) ? ipo.fresh_issue + ' Shares' : 'NA'}}</span></q-item-label>
                    <q-separator spaced color="orange" />
                    <q-item-label overline>Offer for Sale</q-item-label>
                    <q-item-label><span class="text-bold">{{(ipo.offer_for_sale) ? ipo.offer_for_sale+' Shares' : 'NA'}}</span></q-item-label>
                    <q-separator spaced color="orange" />
                    <q-item-label overline>Market Cap at the Time of IPO</q-item-label>
                    <q-item-label><span class="text-bold">&#8377; {{formatNum(ipo.no_of_total_shares * ipo.price_band_high)}}</span></q-item-label>
                    <q-separator spaced color="orange" />
                    <q-item-label overline>Book Running Lead Managers</q-item-label>
                    <q-item-label>
                    <ol style="list-style-type: decimal; list-style-position: inside;">
                        <li v-for="brlm in brlms" :key="brlm.id">
                        <span class="text-bold" >{{brlm.name}}</span>
                        </li>
                    </ol>
                    </q-item-label>
                </div>
                <div class="col-12 col-md-grow q-ma-sm bg-orange-1">
                    <q-item-label>Tentative Calander</q-item-label>
                    <q-item-label>Finalisation of Basis</q-item-label>
                    <q-item-label><span class="text-bold">{{date.formatDate(ipo.t_finalisation_of_basis, 'dddd, Do MMMM, YYYY')}}</span></q-item-label>
                    <q-separator spaced color="orange" />
                    <q-item-label>Initiation of Refunds</q-item-label>
                    <q-item-label><span class="text-bold">{{date.formatDate(ipo.t_initiation_of_refunds, 'dddd, Do MMMM, YYYY')}}</span></q-item-label>
                    <q-separator spaced color="orange" />
                    <q-item-label>Credit of Equity Shares</q-item-label>
                    <q-item-label><span class="text-bold">{{date.formatDate(ipo.t_credit_of_equity_shares, 'dddd, Do MMMM, YYYY')}}</span></q-item-label>
                    <q-separator spaced color="orange" />
                    <q-item-label>Commencement of Trading</q-item-label>
                    <q-item-label><span class="text-bold">{{date.formatDate(ipo.t_commencement, 'dddd, Do MMMM, YYYY')}}</span></q-item-label>
                    <q-separator spaced color="orange" />
                    <q-item-label>Anchor Unlocking</q-item-label>
                    <q-item-label><span class="text-bold">{{(ipo.t_anchor_unlocking) ? date.formatDate(ipo.t_anchor_unlocking, 'dddd, Do MMMM, YYYY') : 'NA'}}</span></q-item-label>
                    <q-separator spaced color="orange" />
                </div>
                </div>
            </q-card-section>

            <!-- About Company -->
            <q-card-section>
                <div class="text-h5" style="font-family: 'Josefin Sans', sans-serif;">About the Company</div>
                <div class="wp-style bg-orange-1 q-pa-md" v-html="ipo.about_html" />
            </q-card-section>

            <!-- objects of the company -->
            <q-card-section id="objects">
                <div class="text-h5" style="font-family: 'Josefin Sans', sans-serif;">Objects of the Issue</div>
                <div class="bg-orange-1 q-pa-md" v-html="ipo.issue_objects_html" />
            </q-card-section>

            <!-- Promoters -->
            <q-card-section>
                <div class="text-h5" style="font-family: 'Josefin Sans', sans-serif;">Promoters</div>
                <div class="row items-stretch q-col-gutter-sm" v-if="promoters && promoters.length > 0">
                    <div class="col-12 col-md-4 promoters" v-for="promoter in promoters" :key="promoter.id">
                        <div class="q-pa-md bg-grey-1 tw-h-full">
                            <div v-if="!promoter.photo.includes('placeholder')">
                                <q-avatar square size="100px">
                                    <img :src="promoter.photo" />
                                </q-avatar>
                            </div>
                            <div class="q-pt-xs">
                                <div class="text-overline">{{promoter.type}}</div>
                                <div class="text-h5 q-mt-sm q-mb-xs">{{promoter.name}}</div>
                                <div class="text-caption" v-html="promoter.description"></div>
                            </div>
                        </div>
                    </div>
                </div>
                <div v-if="holdings && holdings.length > 0" class="text-h6 q-mt-md" style="font-family: 'Josefin Sans', sans-serif;">Promoters Shareholding Pattern</div>
                <div v-if="holdings && holdings.length > 0" class="bg-orange-1 q-pa-md">
                    <table class="tw-table-fixed tw-w-full tw-border">
                        <thead class="tw-bg-gray-200">
                        <tr class="tw-border tw-border-gray-400">
                            <th rowspan="2" class="tw-border tw-border-gray-400">Name</th>
                            <th colspan="2" class="tw-border tw-border-gray-400 tw-text-center">Pre Offer</th>
                            <th colspan="2" class="tw-border tw-border-gray-400 tw-text-center">Post Offer</th>
                        </tr>
                        <tr class="tw-border tw-border-gray-400">
                            <th class="tw-border tw-border-gray-400">Eq. Shares</th>
                            <th class="tw-border tw-border-gray-400">Percent</th>
                            <th class="tw-border tw-border-gray-400">Eq. Shares</th>
                            <th class="tw-border tw-border-gray-400">Percent</th>
                        </tr>
                        </thead>
                        <tbody class="">
                            <tr v-for="holding in holdings" :key="holding.name" class="tw-border tw-border-gray-400">
                                <td class="tw-px-4 tw-py-2 tw-text-gray-900 tw-border tw-border-gray-400">{{holding.name}}</td>
                                <td class="tw-px-4 tw-py-2 tw-text-gray-700 tw-border tw-border-gray-400">{{holding.preOffer}}</td>
                                <td class="tw-px-4 tw-py-2 tw-text-gray-700 tw-border tw-border-gray-400">{{holding.prePercent}}</td>
                                <td class="tw-px-4 tw-py-2 tw-text-gray-700 tw-border tw-border-gray-400">{{holding.postOffer}}</td>
                                <td class="tw-px-4 tw-py-2 tw-text-gray-700 tw-border tw-border-gray-400">{{holding.postPercent}}</td>
                            </tr>
                        </tbody>
                    </table>
                
                </div>
                <div v-if="ipo.promotors_html" v-html="ipo.promotors_html"></div>
            </q-card-section>

            <!-- Financial Statement -->
            <q-card-section v-if="financials" id="financials">
                <div class="text-h5" style="font-family: 'Josefin Sans', sans-serif;">Company Financials</div>
                <div class="row q-col-gutter-sm">
                    <div class="col-12 col-md-6">
                    <q-table wrap-cells
                        title="Profit and Loss Statement"
                        :rows="financials.pl.rows"
                        :columns="financials.pl.columns"
                        row-key="name"
                        hide-bottom
                        flat
                        bordered
                        card-class="bg-orange-1"
                        />
                    </div>
                    <div class="col-12 col-md-6">
                        <q-table wrap-cells virtual-scroll
                            title="Balance Sheet"
                            :rows="financials.bs.rows"
                            :columns="financials.bs.columns"
                            row-key="name"
                            hide-bottom
                            flat
                            bordered
                            card-class="bg-orange-1"
                            >
                        </q-table>
                    </div>
                    </div>
            </q-card-section>

            <!-- Peers Comparision -->
            <q-card-section v-if="peers" id="peers">
                <div class="text-h5" style="font-family: 'Josefin Sans', sans-serif;">Peers Comparision</div>
                <div v-if="peers.row.length > 0">
                    <q-table wrap-cells
                        :rows="peers.row"
                        :columns="peers.col"
                        row-key="name"
                        hide-bottom
                        flat
                        bordered
                        card-class="bg-orange-1"
                        />
                </div>
                <div v-if="ipo.peers.htmlNotes" v-html="ipo.peers.htmlNotes" class="bg-orange-1"></div>
            </q-card-section>

            <!-- SWOT Analysis -->
            <q-card-section id="swot" v-if="swt">
                <div class="text-h5" style="font-family: 'Josefin Sans', sans-serif;">SWOT Analysis</div>
                <div class="row q-col-gutter-sm">
                    <div class="col-12 col-md-3 q-pa-md tw-h-full bg-orange-1">
                            <h6 class="text-h6">Strengths <span v-if="swt.strengths_score">({{swt.strengths_score}})</span></h6>
                            <div v-html="sanitize(swt.strengths_html)" />  
                    </div>
                    <div class="col-12 col-md-3 q-pa-md tw-h-full bg-orange-1">
                        <h6 class="text-h6">Weaknesses <span v-if="swt.weaknesses_score">({{swt.weaknesses_score}})</span></h6>
                        <div v-html="sanitize(swt.weaknesses_html)" />
                    </div>
                    <div class="col-12 col-md-3 q-pa-md tw-h-full bg-orange-1">
                        <h6 class="text-h6">Opportunities <span v-if="swt.opportunities_score">({{swt.opportunities_score}})</span></h6>
                        <div v-html="sanitize(swt.opportunities_html)" />
                    </div>
                    <div class="col-12 col-md-3 q-pa-md tw-h-full bg-orange-1">
                        <h6 class="text-h6">Threats <span v-if="swt.threats_score">({{swt.threats_score}})</span></h6>
                        <div v-html="sanitize(swt.threats_html)" />
                    </div>
                </div>
            </q-card-section>
            <q-card-section id="subscriptions" v-if="subscriptions">
                <div class="text-h5" style="font-family: 'Josefin Sans', sans-serif;">Subscriptions</div>
                <table class="tw-table-fixed tw-w-full tw-border">
                    <thead class="tw-bg-gray-200">
                    <tr class="tw-border tw-border-gray-400">
                    <th class="tw-border tw-border-gray-400">Day</th><th class="tw-border tw-border-gray-400" v-for="log in subscriptions[0]?.logs" :key="log.id"><span v-if="log.cat_id === 4 && log.ipo_id === 398">Policyholders</span><span v-else>{{log.cat.short_name}}</span></th>
                    </tr>
                    </thead>
                    <tbody>
                    <tr v-for="sub in subscriptions" :key="sub.day" class="tw-border tw-border-gray-400">
                        <td class="tw-px-4 tw-py-2 tw-text-gray-900 tw-whitespace-nowrap tw-border tw-border-gray-400">
                        {{date.formatDate(sub.day, 'DD MMM, YYYY')}}
                        </td>
                        <td v-for="l in sub.logs" :key="l.id" class="tw-px-4 tw-py-2 tw-text-gray-900 tw-whitespace-nowrap tw-border tw-border-gray-400">
                        <div v-if="l.cat_id === 1">{{subTimes(netQib, l.subscription)}}<span v-if="l.applications">( <q-icon name="content_copy" />{{l.applications}} )</span></div>
                        <div v-else>{{subTimes(l.quota.quota, l.subscription)}} <span v-if="l.applications">( <q-icon name="content_copy" />{{l.applications}} )</span></div>
                        </td>
                    </tr>
                    </tbody>
                </table>
            </q-card-section>
        </q-card>
   </q-page>
  
</template>

<script setup>
  import { ref, onMounted } from 'vue'
  import { useRoute, useRouter } from 'vue-router'
  import { axios } from '../boot/axios'
  import { useMeta, scroll } from 'quasar'
  import { date } from 'quasar'
  import VueSlider from 'vue-slider-component'
  import 'vue-slider-component/theme/antd.css'
  
  const route = useRoute()
  const router = useRouter()

  const bar = ref(null)
  const ipo_id = ref(route.params.id.split('-')[0])
  const ipo = ref({})
 
  const pre = ref({})
  const nxt = ref({})
  const listingNse = ref({})
  const listingBse = ref({})
  const nseLive = ref({})
  const liveClose = ref()
  const listingClose = ref()
  const dayEnd = ref()
  const promoters = ref([])
  const holdings = ref([])
  const financials = ref()
  const peers = ref()
  const brlms = ref()
  const swt = ref()
  const style = {
        background: "orange"
    }

const subscriptions = ref([])
const netQib = ref(0)

  
const parseToCr = (str) => {
    let n = Number(str.replace(/,/g, ""))
    return (n/100).toFixed(2)
}

const nextIpo = (ipo) => {
    
    router.push({name: 'ipo', params: { id: ipo.ipo_id+'-'+encodeURIComponent(ipo.company_name) }})
}

const cagr = () => {
    //str.replace(/,/g, "")
    //console.log(nseLive.value.lastPrice, ipo.value.issue_price)
    let duration = date.getDateDiff(new Date(), new Date(listingNse.value.listing_date), 'days') / 365
    let gain = Number(nseLive.value.lastPrice.replace(/,/g, "")) / Number(ipo.value.issue_price)
    let cagr = (duration >= 1) ? ((Math.pow(gain, 1/duration) - 1)*100).toFixed(2) + '%' : 'NA'
    return cagr
    }

const preturn = () => {
    let curPrice = Number(nseLive.value.lastPrice.replace(/,/g, ""))
    let issuePrice = Number(ipo.value.issue_price)
    return (( curPrice - issuePrice ) * 100 / issuePrice).toFixed(2)
}

const allotReturn = () => {
    let curPrice = Number(nseLive.value.lastPrice.replace(/,/g, ""))
    let issuePrice = Number(ipo.value.issue_price)
    return ((curPrice - issuePrice) * ipo.value.lot_size).toFixed(2)
}

const mcapAtIpo = () => {
    return (ipo.value.no_of_total_shares * ipo.value.price_band_high / 10000000).toFixed(2) + ' Cr'
}

const mcapAtListing = () => {
    return (ipo.value.no_of_total_shares * listingNse.value.listing_price / 10000000).toFixed(2) + ' Cr'
}

const curMCap = () => {
    return (ipo.value.no_of_total_shares * nseLive.value.lastPrice / 10000000).toFixed(2) + ' Cr'
}

const mCapType = () => {
    let mCap = ipo.value.no_of_total_shares * nseLive.value.lastPrice / 10000000
    if (mCap >= 20000) return 'Large Cap'
    else if( mCap < 20000 && mCap >= 5000) return 'Mid Cap'
    else return 'Small Cap'
}

const formatNum = (num) => {
    if(num > 999 && num < 1000000){
        return (num/1000).toFixed(1) + 'K'; // convert to K for number from > 1000 < 1 million 
    }else if(num > 10000000){
        return (num/10000000).toFixed(1) + ' Cr'; // convert to M for number from > 1 million 
    }else if(num < 900){
        return num; // if value < 1000, nothing to do
    }
  }

const sanitize = (html) => html.replace(/>\s+</g,'><')

const getSubscriptions = async() => {
    let subs = await axios.get('https://droplet.netserve.in/ipo-subscription-logs?expand=cat,quota&ipo_id='+ipo.value.ipo_id).then(r => r.data)
    let start = new Date(ipo.value.open_date)
    let end = new Date(ipo.value.close_date)
    let subsArray = []
    for(let i = 0; i <= date.getDateDiff(end, start, 'days'); i++){
        let day = date.addToDate(start, {days: i})
        let dlogs = []
        let logs = subs.filter(sub => sub.day == date.formatDate(day, 'YYYY-MM-DD'))
        let qib = logs.filter(log => log.cat_id == 1)
        let bigHni = logs.filter(log => log.cat_id == 2)
        let smallHni = logs.filter(log => log.cat_id == 8)
        let retail = logs.filter(log => log.cat_id == 3)
        let employee = logs.filter(log => log.cat_id == 5)
        let shareholder = logs.filter(log => log.cat_id == 4)
        if(qib && qib.length > 0) dlogs.push(qib[0])
        if(bigHni && bigHni.length > 0) dlogs.push(bigHni[0])
        if(smallHni && smallHni.length > 0) dlogs.push(smallHni[0])
        if(retail && retail.length > 0) dlogs.push(retail[0])
        if(employee && employee.length > 0) dlogs.push(employee[0])
        if(shareholder && shareholder.length > 0) dlogs.push(shareholder[0])
        
        if(dlogs.length > 0) subsArray.push({day: day, logs: dlogs})
        }
    return subsArray
}

const getNetQib = async() => {
    let quotas = await axios.get('https://droplet.netserve.in/ipo-cat-quota?ipo_id='+ipo.value.ipo_id).then(r => r.data)
    let qib = quotas.filter(q => q.cat_id === 1)
    let anchor = quotas.filter(q => q.cat_id === 6)
    qib = (qib && qib.length > 0) ? qib[0].quota : 0
    anchor = (anchor && anchor.length > 0) ? anchor[0].quota : 0
    return qib - anchor
}

const subTimes = (quota, subs) => {
  if(subs > 0 && quota > 0){
    return (subs/quota).toFixed(2)+'x'
  }
  else return 'NA'
}

onMounted(async() => {
ipo.value = await axios.get('https://droplet.netserve.in/ipos/'+ipo_id.value+'?expand=registrar,promoters,listings,sector,subscriptions').then(r => r.data)
if(ipo.value.ipo_type === 'SME') {
    router.push({name: 'sme', params: { id: ipo.value.ipo_id+'-'+encodeURIComponent(ipo.value.company_name) }})
}
let prenext = await axios.get('https://droplet.netserve.in/ipo/prenext?d='+ipo.value.open_date).then(r => r.data)
//console.log(prenext)
pre.value = prenext.pre[prenext.pre.findIndex(x => x.ipo_id === ipo.value.ipo_id) + 1]
nxt.value = prenext.next[prenext.next.findIndex(x => x.ipo_id === ipo.value.ipo_id) + 1]
//console.log(nxt.value)
// let nifty = await axios.get('https://stockapi.ipoinbox.com/quote?companyName='+nse.value.scrip_code).then(r => r.data)

listingNse.value = (ipo.value.listings && ipo.value.listings.length > 0) ? ipo.value.listings.filter(list => list.exchange === 'NSE')[0] : null
listingBse.value = (ipo.value.listings && ipo.value.listings.length > 0) ? ipo.value.listings.filter(list => list.exchange === 'BSE')[0] : null

listingClose.value = (listingNse.value && listingNse.value.close) ? listingNse.value.close : 0

//console.log(listingNse.value)
if(listingNse.value && listingNse.value.scrip_code){
    let live = await axios.get('https://stockapi.ipoinbox.com/quote?companyName='+listingNse.value.scrip_code.trim()).then(r => r.data)
    //console.log(live)
    if(live.data[0]){
        nseLive.value = live.data[0]
        nseLive.value.lastUpdate = live.lastUpdateTime
    }

    liveClose.value = nseLive.value.lastPrice || 0 

    dayEnd.value = await axios.get('https://droplet.netserve.in/nse/dayend?s='+listingNse.value.scrip_code).then(r => r.data)
}



//console.log(dayEnd.value)
if(ipo.value.promoters.length > 0){
    var TotalpreOffer = 0
    var TotalprePercent = 0
    var TotalpostOffer = 0
    var TotalpostPercent = 0
    ipo.value.promoters.forEach(promoter => {
        TotalpreOffer += promoter.pre_offer_shares
        TotalprePercent += promoter.pre_offer_percentage
        TotalpostOffer += promoter.post_offer_shares
        TotalpostPercent += promoter.post_offer_percentage
        let pr = {name: promoter.name, type: promoter.type, photo: promoter.photo, description: promoter.description}
        promoters.value.push(pr)
        if(promoter.pre_offer_shares > 0) {
            let holding = {name: promoter.name, preOffer: promoter.pre_offer_shares, prePercent: promoter.pre_offer_percentage, postOffer: promoter.post_offer_shares, postPercent: promoter.post_offer_percentage}
            holdings.value.push(holding)
        }
    })
    if(ipo.value.promoters.length > 1){
        holdings.value.push({name: 'Total', preOffer: TotalpreOffer, prePercent: TotalprePercent.toFixed(2), postOffer: TotalpostOffer, postPercent: TotalpostPercent.toFixed(2)})
    }
    }
if(ipo.value.financials){
    financials.value = JSON.parse(ipo.value.financials)
    //console.log(financials.value )
}
if(ipo.value.peers){
    peers.value = JSON.parse(ipo.value.peers)
}

if(ipo.value.brlms_json){
    brlms.value = JSON.parse(ipo.value.brlms_json)
}

if(ipo.value.swot){
    swt.value = JSON.parse(ipo.value.swot)
}

subscriptions.value = await getSubscriptions()
netQib.value = await getNetQib()

console.log(netQib.value)

useMeta({
    title: ipo.value.company_name,
    titleTemplate: title => `${title} - IPO Inbox`,
})
})
</script>
<style>
.fixed_right{
    position: fixed; 
     bottom: 50%;
     right: -5px;
     width: 70px; 
     border: 0px solid #d6d6d6;
     z-index: 1000;
}

.fixed_left{
    position: fixed; 
     bottom: 50%;
     left: -5px;
     width: 70px; 
     border: 0px solid #d6d6d6;
     z-index: 1000;
}

.fixed_right:hover{
  transform:scale(1.4);
  right:5px
}

h3{
    position: relative;

    padding: 0;
    margin: 0;
    font-family: "Raleway", sans-serif;
    font-weight: 300;
    font-size: 26px;
    color: #080808;
    -webkit-transition: all 0.4s ease 0s;
    -o-transition: all 0.4s ease 0s;
    transition: all 0.4s ease 0s;
}
#nse-live{
  width:80%;
  margin:10px auto;
  padding:5px;
  text-align:center;
  border-radius: 10px;
}
#nse-live h3{
  padding-bottom: 5px;
}

#nse-live h5{
  margin-top: -15px;
  font-size:14px;
}

.wp-style{
  color: #222; 
  font-family: 'Open Sans', sans-serif; 
  font-size: 15px; font-weight: 400; 
  line-height: 24px;
  text-align:justify;
}

.wp-style h3{
  font-family: 'Josefin Sans', sans-serif;
  font-size: 21px;
  font-weight: 500;
  letter-spacing: 0;
  line-height: 1.5em;
  padding-top: 15px;
  position: relative;
  text-transform: uppercase;
}

.wp-style h3:before{
   position: absolute;
  left: 0;
  bottom: 0;
  width: 60px;
  height: 2px;
  content: "";
  background-color: #c50000;
}

.wp-style ul{
  list-style: disc inside;
}

.wp-style ul ul{
  margin-left:4vw;
  list-style: circle inside;
}

.wp-style ul ol{
    margin-left:4vw;
    list-style: lower-roman inside;
}

.wp-style .contact{
  display: flex;
  justify-content: space-between;
  margin-top:10px;
}
.contact strong{
  border-bottom: 1px solid #333;
  padding-bottom:2px;
  margin-bottom:5px;
  text-transform: uppercase;
}

.wp-style table {
  border-spacing: 1; 
  border-collapse: collapse;
  border-color: rgb(202, 193, 193);
  border-width: 1px;
  border-radius:6px;
  overflow:hidden;
  max-width:800px; 
  width:100%;
  margin:0 10px;
  position:relative;
}
.wp-style td, .wp-style th{
  border: 1px solid rgb(202, 193, 193);
  padding: 5px;
  text-align: left;
}

.promoters ul{
    list-style: disc inside;
}

#objects p { 
  margin-top:2rem;
}
#objects table {
  border-spacing: 1; 
  border-collapse: collapse;
  border-color: rgb(202, 193, 193);
  border-width: 1px;
  border-radius:6px;
  overflow:hidden;
  max-width:800px; 
  width:100%;
  margin:0 10px;
  position:relative;
}
#objects td, #objects th{
  border: 1px solid rgb(202, 193, 193);
  padding: 5px;
  text-align: left;
}

#swot ul{
    list-style-position: outside;
    margin-left: 5px;
    list-style-type: circle;
}
</style>
