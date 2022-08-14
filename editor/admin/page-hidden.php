<?php
/**
 * Main HTML page of rubyslider plugins
 * Page : Tools
 */

?>


<!-- RUBYSLIDER wrap content -->
<div class="rs02page rs02page-options">

<!-- RUBYSLIDER wrap content -->
<!-- <div class="rubyslider-home wrap"> -->
    
    <!-- HEADER SECTION - begin
    ////////////////////////////////////////////////////////////////////////// -->
    <div class="rs02part-header rs02clear-a">

        <!-- RUBYSLIDER LOGO -->
        <a class="rs02logo" href="admin.php?page=rubyslider" title="Home">RUBYSLIDER</a>
        <span style="display: inline-block; padding: 4px 0 0 6px; color: #22aadd;"> - beta</span>

    </div>
    <!-- HEADER SECTION - end
    ////////////////////////////////////////////////////////////////////////// -->
    




    <!-- Phan IMPORT - EXPORT -->
    <h4 style="margin-top: 50px;">Import - Export</h4>
    <hr>

    <table class="form-table">
        <tr>
            <th>Import database</th>
            <td>
                <textarea
                    id="rs02import-field"
                    style="width: 100%;"
                    name="rs02import-field"
                    cols="30" rows="8"
                    spellcheck="false" autocomplete="off" autocorrect="off" autocapitalize="off"
                    placeholder="Past your rubyslider database"
                ></textarea>

                <a id="rs02import-update" class="button">Update Database</a>
                <a class="button rs02-form-clear" data-textarea="#rs02import-field">Clear</a>
                <br><br>
            </td>
        </tr>

        <tr>
            <th>Export database</th>
            <td>
                <textarea id="rs02export-field" style="width: 100%;" name="rs02export-field" cols="30" rows="15" readonly></textarea>
                <a id="rs02export-get" class="button">Get Database</a>
                <a id="rs02export-select" class="button">Select All</a>
                <a class="button rs02-form-clear" data-textarea="#rs02export-field">Clear</a>
                
                <!-- <a id="rs02-save-file" class="button" href="#">Save As File</a> -->
                <form action="" method="POST" style="margin-top: 10px;">
                    <input type="hidden" name="action" value="rs02export-download">
                    <input class="button" type="submit" value="Save As File">
                </form>
            </td>
        </tr>
    </table>

    <div class="output"></div>
</div>