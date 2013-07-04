#!/usr/bin/perl

# Maak's script for counting anon table "hacks"
# May be useful in the future for doing comment parse-y things
# https://gist.github.com/xb95/f2a0e214a8c5816d90ff
# need to get dreamwidth code and perl, horq

use v5.14;
 
use strict;
use lib "$ENV{LJHOME}/extlib/lib/perl5";
use lib "$ENV{LJHOME}/cgi-bin";
BEGIN { require 'ljlib.pl'; }
 
my $u = LJ::load_user( 'hms_anon' ) or die;
my $cmts = $u->selectall_arrayref(
    q{SELECT body FROM talktext2 WHERE journalid = ? AND body LIKE '%<table%'},
    undef, $u->id
);
die $u->errstr if $u->err;
 
my ( $btct, $other, $font, $height ) = ( 0, 0 );
foreach my $cmt ( @$cmts ) {
    if ( $cmt->[0] =~ /background=/i ) {
        $btct++;
    } elsif ( $cmt->[0] =~ /height=/i ) {
        $height++;
    } elsif ( $cmt->[0] =~ /<font /i ){
        $font++;
    } else {
        $other++;
        say $cmt->[0];
    }
}
 
say "";
say "** $btct background images, $font font hacks, $height height hacks, $other other";