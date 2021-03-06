/*
 * Copyright (C) 2005 - 2014 TIBCO Software Inc. All rights reserved.
 * http://www.jaspersoft.com.
 *
 * Unless you have purchased  a commercial license agreement from Jaspersoft,
 * the following license terms  apply:
 *
 * This program is free software: you can redistribute it and/or  modify
 * it under the terms of the GNU Affero General Public License  as
 * published by the Free Software Foundation, either version 3 of  the
 * License, or (at your option) any later version.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the
 * GNU Affero  General Public License for more details.
 *
 * You should have received a copy of the GNU Affero General Public  License
 * along with this program. If not, see <http://www.gnu.org/licenses/>.
 */


/**
 * @author: Narcis Marcu (nmarcu@jaspersoft.com)
 * @version: $Id: jr.ReportExecution.js 47331 2014-07-18 09:13:06Z kklein $
 */

define(['jquery'], function($) {
    var ReportExecution = function(arrHyperlinks) {
        this.hyperlinks = arrHyperlinks;
        this.reportInstance = null;
        this.reportContainer = null;
    };

    ReportExecution.prototype = {
        register: function() {
            var it = this;
            $(it.hyperlinks[0].selector).on('click', function(evt) {
                var hlData = it._getHyperlinkData($(this).attr('data-id'));
                if (hlData) {
                    it._handleHyperlinkClick(hlData);
                }
            }).css('cursor', 'pointer');
        },
        handleInteraction: function(evt) {
            if ('hyperlinkClicked' == evt.type) {
                var hlData = this._getHyperlinkData(evt.data.hyperlink.id);
                if (hlData) {
                    this._handleHyperlinkClick(hlData);
                }
            }
        },

        // internal functions
        _getHyperlinkData: function(id) {
            var hlData = null;
            $.each(this.hyperlinks, function(i, hl) {
                if (id === hl.id) {
                    hlData = hl;
                    return false; //break each
                }
            });
            return hlData;
        },
        _handleHyperlinkClick: function(hyperlink) {
            
            var d_width = ((hyperlink.params.width)  ?  hyperlink.params.width : "auto");
            var d_height = ((hyperlink.params.height)  ?  hyperlink.params.height : "auto");
            var d_title = ((hyperlink.params.title)  ?  hyperlink.params.title : "Dialog");
            var d_content = ((hyperlink.params.content)  ?  hyperlink.params.content : "");

            if ( $( "#dialog" ).length == 0 ) {
                var new_dialog = $('<div id="dialog"><div id="report"></div></div>');
                new_dialog.insertAfter('#reportContainer');
            }

            //var uri = "http://localhost:8080/jasperserver-pro/flow.html?_flowId=viewReportFlow&standAlone=true&_flowId=viewReportFlow&ParentFolderUri=%2Fpublic%2FSamples%2FReports&reportUnit=%2Fpublic%2FSamples%2FReports%2F01._Geographic_Results_by_Segment_Report&viewAsDashboardFrame=true"
            // if ( $( "#dialog" ).length == 0 ) {
            //     var new_dialog = $('<div id="dialog"><div id="report"></div><br><iframe id="dialog_frame" width="100%" height="90%" src="'+uri+'"></iframe></div>');
            //     new_dialog.insertAfter('#reportContainer');
            // }

            // if ( $( "#dialog_frame" ).length == 0 ) {
            //     var new_dialog_frame = $('<iframe id="dialog_frame" src="http://localhost:8080/jasperserver-pro"></iframe>');
            //     new_dialog.insertAfter('#report');
            // }


            $("#dialog").dialog({ height: d_height, width: d_width, title: d_title });
            $("#report").html(d_content);

        }
    };

    return ReportExecution;
});
